import * as MediaLibrary from 'expo-media-library'
import { Asset, AssetRef } from 'expo-media-library'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import { AlbumInfo, AlbumType } from './types'

import { arrayIsEmpty } from '@utils-ui/common/validation/validateArray'

import {
	MediaBrowserModalContainer,
	MediaBrowserScrollView,
	AlbumContainer,
	MediaFlatListContainer,
	MediaFlatList,
	ConfirmSelectionButton,
	MediaBrowserHeader,
	MediaBrowserHeaderText,
	NotPermissionText,
	ActivityIndicatorContainer,
	ActivityIndicatorBg,
	HeaderTextContent,
	InvalidAssetAlert,
	InvalidDurationText,
	InvalidAssetContainer,

} from './styles'
import CheckIcon from '@assets/icons/check-white.svg'
import CloseIcon from '@assets/icons/x-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { AlbumThumbnail } from '@components/AlbumThumbnail'
import { MediaThumbnail } from '@components/MediaThumbnail'

interface MediaBrowserProps {
	showMediaBrowser: boolean,
	maxImages?: number,
	videoDurationLimit?: number,
	onClose: () => void,
	onSelectionConfirmed: (mediaSelected: Asset[]) => void,
}

function MediaBrowserModal({ showMediaBrowser, maxImages = 10, videoDurationLimit = 180, onClose, onSelectionConfirmed }: MediaBrowserProps) {
	const [albums, setAlbums] = useState<AlbumType[]>([])
	const [media, setMedia] = useState<Asset[]>([])
	const [cursor, setCursor] = useState<AssetRef | undefined>(undefined)
	const [albumSelected, setAlbumSelected] = useState<AlbumInfo>()
	const [mediaSelected, setMediaSelected] = useState<Asset[]>([])

	const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()
	const [isContentLoading, setIsContentLoading] = useState(false)
	const [showInvalidDurationText, setShowInvalidDurationText] = useState(false)

	useEffect(() => {
		if (showMediaBrowser && albums.length === 0) loadAlbums()
	}, [showMediaBrowser, permissionResponse])

	const withoutAccessPermissions = () => {
		if (Platform.OS === 'ios') {
			return !permissionResponse?.granted || permissionResponse?.accessPrivileges !== 'all'
		}
		return !permissionResponse?.granted
	}

	const loadAlbums = async () => {
		if (withoutAccessPermissions()) {
			return requestPermission()
		}
		const fetchedAlbums = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true })
		const manipulatedAlbums = await manipulateAlbums(fetchedAlbums as AlbumType[])

		setAlbums(manipulatedAlbums as AlbumType[])
	}

	const manipulateAlbums = async (currentAlbums: AlbumType[]) => {
		const albumsContainerOnlyPhotos = await getOnlyAlbumsWithPhotos(currentAlbums as AlbumType[])
		return ordenateByAlbumTitle(albumsContainerOnlyPhotos as AlbumType[])
	}

	const getOnlyAlbumsWithPhotos = async (currentAlbums: AlbumType[]) => { // TODO Type
		const allAlbums = await Promise.all(
			currentAlbums.map(async (album: AlbumType) => {
				if (await firstAssetIsPhotoType(album.id)) { // Essa função veIrifica se há imagens no album, o nome não está muito bom
					const [firstAsset] = await getFirstAssetInAlbum(album.id)
					return { ...album, thumbnail: firstAsset.uri }
				}
				return false
			})
		)

		return allAlbums.filter((album) => !!album) // Essa linha apaga os albums vazios
	}

	const ordenateByAlbumTitle = (currentAlbums: AlbumType[]) => {
		return currentAlbums.sort((a, b) => {
			const firstLetterA = a.title.substring(0, 1)
			const firstLetterB = b.title.substring(0, 1)

			return firstLetterA.charCodeAt(0) - firstLetterB.charCodeAt(0)
		})
	}

	const firstAssetIsPhotoType = async (albumId: string) => {
		const firstAsset = await getFirstAssetInAlbum(albumId)
		return !!firstAsset.length
	}

	const getFirstAssetInAlbum = async (albumId: string) => {
		const firstAsset = await MediaLibrary.getAssetsAsync({
			first: 1,
			sortBy: 'creationTime',
			mediaType: ['photo', 'video'], // Tipo de mídia
			album: albumId
		})

		return firstAsset.assets
	}

	const loadAlbumMedia = async (id?: string) => {
		if (cursor === '') {
			return
		}

		const albumId = id || albumSelected?.id

		setIsContentLoading(true)

		const albumMedia = await MediaLibrary.getAssetsAsync({
			first: 30,
			album: albumId,
			sortBy: 'creationTime',
			mediaType: ['photo', 'video'], // Tipo de mídia
			after: cursor
		})
		setCursor(albumMedia.hasNextPage ? albumMedia.endCursor : '')

		setMedia([...media, ...albumMedia.assets])
		setIsContentLoading(false)
	}

	const selectAlbumHandler = async (album: AlbumType) => {
		setAlbumSelected({ id: album.id, albumName: album.title })
		await loadAlbumMedia(album.id)
	}

	const unselectAlbum = () => {
		setAlbumSelected(null as any)
		setCursor(undefined)
		setMedia([])
		setMediaSelected([])
	}

	const invalidDurationPopUp = () => {
		setShowInvalidDurationText(true)
		setTimeout(() => {
			setShowInvalidDurationText(false)
		}, 4000)
	}

	const mediaHasSelected = (item: Asset) => {
		return !!(mediaSelected.find((asset) => asset.id === item.id))
	}

	const assetSelectionHandler = async (item: Asset) => {
		if (item.duration > videoDurationLimit) {
			invalidDurationPopUp()
			return
		}

		let customAsset = { ...item }
		if (Platform.OS === 'ios') {
			const assetInfo = await MediaLibrary.getAssetInfoAsync(item.id)
			customAsset = { ...item, uri: assetInfo.localUri, videoThumbnail: item.uri, } as Asset
		}

		let itemsSelected = []
		if (mediaHasSelected(item)) {
			itemsSelected = mediaSelected.filter((asset) => asset.id !== customAsset.id)
		} else {
			if (mediaSelected.length >= maxImages) return
			itemsSelected = [...mediaSelected, customAsset]
		}

		setMediaSelected(itemsSelected)
	}

	const confirmSelectionHandler = () => {
		onSelectionConfirmed(mediaSelected)
		unselectAlbum()
		setMediaSelected([])
		closeMediaBrowser()
	}

	const closeMediaBrowser = () => {
		onClose()
	}

	const renderAlbums = () => {
		return (
			<MediaBrowserScrollView>
				<AlbumContainer>
					{
						albums.map((album, index) => (
							<AlbumThumbnail
								key={uuid()}
								album={album}
								onSelectAlbum={selectAlbumHandler}
							/>
						))
					}
				</AlbumContainer>
			</MediaBrowserScrollView>
		)
	}

	const renderAlbumPhotos = () => {
		if (!media) return <></>
		return (
			<>
				<MediaFlatListContainer>
					<MediaFlatList
						data={media}
						renderItem={({ item }: any) => (
							<MediaThumbnail
								active={mediaHasSelected(item)}
								mediaAsset={item}
								onSelection={assetSelectionHandler}
							/>
						)}
						numColumns={3}
						onEndReached={() => loadAlbumMedia()}
					/>

				</MediaFlatListContainer>
				{

					isContentLoading && (
						<ActivityIndicatorContainer isLoadingMore={arrayIsEmpty(media)}>
							<ActivityIndicatorBg>
								<ActivityIndicator size={'large'} color={theme.colors.orange[4]} />
							</ActivityIndicatorBg>
						</ActivityIndicatorContainer>
					)
				}
				{
					(mediaSelected.length > 0) && (
						<ConfirmSelectionButton>
							<SmallButton
								relativeWidth={relativeScreenWidth(20)}
								height={relativeScreenWidth(13)}
								color={theme.colors.green[3]}
								labelColor={theme.colors.white[3]}
								SvgIcon={CheckIcon}
								onPress={confirmSelectionHandler}
							/>
						</ConfirmSelectionButton>

					)
				}
			</>

		)
	}

	return (
		<MediaBrowserModalContainer animationType={'slide'} visible={showMediaBrowser}>
			{
				showInvalidDurationText && (
					<InvalidAssetContainer>
						<InvalidAssetAlert>
							<InvalidDurationText>{`Seu vídeo tem mais que ${videoDurationLimit / 60} minutos`}</InvalidDurationText>
						</InvalidAssetAlert>
					</InvalidAssetContainer>
				)
			}

			<StatusBar backgroundColor={theme.colors.white[3]} />
			<MediaBrowserHeader isIos={Platform.OS === 'ios'}>
				{
					albumSelected ? (
						<BackButton onPress={unselectAlbum} />
					) : (
						<SmallButton
							color={theme.colors.red[3]}
							SvgIcon={CloseIcon}
							relativeWidth={relativeScreenWidth(12)}
							height={relativeScreenWidth(12)}
							onPress={closeMediaBrowser}
						/>
					)
				}
				<HeaderTextContent >
					<MediaBrowserHeaderText
						flex={0.7}
						numberOfLines={2}
					>
						{albumSelected ? albumSelected.albumName : 'Álbums'}
					</MediaBrowserHeaderText>
					<MediaBrowserHeaderText
						flex={0.4}
					>
						{albumSelected ? `${mediaSelected.length}/${maxImages}` : ''}
					</MediaBrowserHeaderText>
				</HeaderTextContent>
			</MediaBrowserHeader>
			{albumSelected ? renderAlbumPhotos() : renderAlbums()}
			{
				withoutAccessPermissions() && (
					<NotPermissionText>
						{'Você não permitiu o uso da câmera ou galeria, você precisa ir em configurações "corre." e permitir acesso total'}
					</NotPermissionText>
				)
			}
		</MediaBrowserModalContainer>
	)
}

export { MediaBrowserModal }
