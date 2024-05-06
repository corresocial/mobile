import * as MediaLibrary from 'expo-media-library'
import { Asset, AssetRef } from 'expo-media-library'
// import * as VideoThumbnails from 'expo-video-thumbnails'
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
	onClose: () => void,
	onSelectionConfirmed: (mediaSelected: Asset[]) => void,
}

function MediaBrowserModal({ showMediaBrowser, maxImages = 10, onClose, onSelectionConfirmed }: MediaBrowserProps) {
	const [albums, setAlbums] = useState<AlbumType[]>([])
	const [media, setMedia] = useState<Asset[]>([])
	const [cursor, setCursor] = useState<AssetRef | undefined>(undefined)
	const [albumSelected, setAlbumSelected] = useState<AlbumInfo>()
	const [mediaSelected, setMediaSelected] = useState<Asset[]>([])

	const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()
	const [isContentLoading, setIsContentLoading] = useState(false)

	useEffect(() => {
		loadAlbums()
	}, [])

	const loadAlbums = async () => {
		if (permissionResponse?.status !== 'granted') {
			await requestPermission()
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
				if (await firstAssetIsPhotoType(album.id)) { // Essa função verifica se há imagens no album, o nome não está muito bom
					const [firstAsset] = await getFirstAssetInAlbum(album.id)

					// if (firstAsset.mediaType === 'video') {
					// 	const { uri } = await VideoThumbnails.getThumbnailAsync(firstAsset.uri, { time: 1000 })
					// 	return { ...album, thumbnail: uri }
					// }

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
		//	const albumMediaWithThumbnail = await generateThumbnailOnVideoAssets(albumMedia.assets)
		// setMedia([...media, ...albumMediaWithThumbnail])
		setIsContentLoading(false)
	}

	// const generateThumbnailOnVideoAssets = async (assets: Asset[]) => {
	// 	return Promise.all(
	// 		assets.map(async (asset) => {
	// 			if (asset.mediaType === 'photo') return { ...asset }
	// 			const { uri } = await VideoThumbnails.getThumbnailAsync(asset.uri, { time: 1000 })
	// 			return { ...asset, thumbnail: uri }
	// 		})
	// 	)
	// }

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

	const assetSelectionHandler = (item: any) => {
		const isItemSelected = mediaSelected.includes(item)
		let itemsSelected = []
		if (isItemSelected) {
			itemsSelected = mediaSelected.filter((asset) => asset !== item)
		} else {
			if (mediaSelected.length >= maxImages) return
			itemsSelected = [...mediaSelected, item]
		}

		console.log(itemsSelected)
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
								active={mediaSelected.includes(item)}
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
								<ActivityIndicator
									size={'large'}
									color={theme.orange4}
								/>
							</ActivityIndicatorBg>
						</ActivityIndicatorContainer>
					)
				}
				{
					(mediaSelected.length > 0) && (
						<ConfirmSelectionButton>
							<SmallButton
								flexDirection={'row-reverse'}
								relativeWidth={relativeScreenWidth(20)}
								height={relativeScreenWidth(13)}
								color={theme.green3}
								labelColor={theme.white3}
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
			<StatusBar backgroundColor={theme.white3} />
			<MediaBrowserHeader isIos={Platform.OS === 'ios'}>
				{
					albumSelected ? (
						<BackButton onPress={unselectAlbum} />
					) : (
						<SmallButton
							color={theme.red3}
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
				!permissionResponse?.granted && (
					<NotPermissionText>
						{'Você não permitiu o uso da câmera ou galeria, você precisa ir em configurações "corre." e permitir.'}
					</NotPermissionText>
				)
			}
		</MediaBrowserModalContainer>
	)
}

export { MediaBrowserModal }

// TODO Video
