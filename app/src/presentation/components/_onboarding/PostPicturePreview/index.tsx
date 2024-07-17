import ImageEditor from 'expo-image-cropper'
import { Asset } from 'expo-media-library'
import React, { useContext, useLayoutEffect, useState } from 'react'

import { LoaderContext } from '@contexts/LoaderContext'

import { MediaAsset } from 'src/presentation/types'

import { generateVideoThumbnails } from '@utils-ui/common/convertion/generateVideoThumbnail'
import { UiUtils } from '@utils-ui/common/UiUtils'

import { ButtonsContainer, Container, HorizontalListPicturesContainer, PicturePreviewContainer, TopArea } from './styles'
import AddPictureWhiteIcon from '@assets/icons/addPicture-white.svg'
import NewPhotoWhiteIcon from '@assets/icons/camera-white.svg'
import CheckIcon from '@assets/icons/check-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { CustomCameraModal } from '@components/_modals/CustomCameraModal'
import { MediaBrowserModal } from '@components/_modals/MediaBrowserModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { VideoPortrait } from '@components/VideoPortrait'

import { HorizontalListPictures } from '../../HorizontalListPictures'
import { PhotoPortrait } from '../../PhotoPortrait'

const { compressImage, compressVideo } = UiUtils()
interface PostPicturePreviewProps {
	backgroundColor: string
	initialValue?: MediaAsset[]
	navigateBackwards: () => void
	saveMedia: (picturesUrl: string[], videosUrl: string[]) => void
}

function PostPicturePreview({
	backgroundColor,
	initialValue,
	navigateBackwards,
	saveMedia
}: PostPicturePreviewProps) {
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [mediaPack, setMediaPack] = useState<MediaAsset[]>(initialValue || [])
	const [mediaIndexSelected, setMediaIndexSelected] = useState<number>(0)
	const [cameraOpened, setCameraOpened] = useState<boolean>(false)
	const [mediaBrowserOpened, setMediaBrowserOpened] = useState<boolean>(false)
	const [imageCropperOpened, setImageCropperOpened] = useState<boolean>(false)

	useLayoutEffect(() => {
		setThumbnailsOnVideos()
	}, [])

	const setThumbnailsOnVideos = async () => {
		const hasVideos = (initialValue || []).find((media) => media && media.mediaType === 'video')
		if (hasVideos) {
			const newMediaPack = await generateThumb()
			setMediaPack(newMediaPack)
		} else {
			setMediaPack(initialValue || [])
		}
	}

	const generateThumb = async (customMedia?: MediaAsset[]) => {
		return Promise.all(
			(customMedia || mediaPack).map(async (media) => {
				if (media.mediaType === 'video') {
					try {
						const videoThumbnail = await generateVideoThumbnails(media.url) as string
						return { ...media, videoThumbnail: videoThumbnail }
					} catch (error) {
						console.log(error)
					}
				}
				return media
			})
		)
	}

	const setPictureUri = (uri: string) => {
		const currentMedia = [...mediaPack]
		currentMedia.push({ url: uri, mediaType: 'photo' })
		setMediaPack(currentMedia)
		setMediaIndexSelected(mediaPack.length)
	}

	const deleteCurrentMedia = () => {
		const picturesAfterDelete = mediaPack.filter((_, index) => index !== mediaIndexSelected)
		setMediaIndexSelected(mediaPack.length - 2)
		setMediaPack(picturesAfterDelete)
	}

	const editCurrentPicture = () => {
		setImageCropperOpened(true)
	}

	const saveCroppedImage = (image: any) => {
		const newPicturesPack = [...mediaPack]
		newPicturesPack[mediaIndexSelected] = image.uri
		setMediaPack(newPicturesPack)
		setImageCropperOpened(false)
	}

	const mediaBrowserHandler = async (mediaSelected: Asset[]) => {
		const currentMedia = mediaSelected.map((media: Asset) => {
			return { url: media.uri, mediaType: media.mediaType, videoThumbnail: (media as any).videoThumbnail! } as MediaAsset
		})

		setMediaPack([...mediaPack, ...currentMedia])
		setMediaIndexSelected(mediaPack.length)
	}

	const savePictures = async () => {
		setLoaderIsVisible(true)
		const picturesUri: string[] = []
		const videosUri: string[] = []

		mediaPack.forEach((mediaAsset) => {
			if (mediaAsset.mediaType === 'video') videosUri.push(mediaAsset.url)
			else picturesUri.push(mediaAsset.url)
		})

		const compressedVideoUris = await compressVideosUris(videosUri)
		const compressedPictureUris = await compressPicturesUris(picturesUri)

		saveMedia(compressedPictureUris, compressedVideoUris)
		setLoaderIsVisible(false)
	}

	const compressPicturesUris = async (picturesUri: string[]) => {
		return Promise.all(picturesUri.map(async (uri) => {
			if ((initialValue || [{ url: '' }]).find((media) => media.url === uri)) return uri
			return compressImage(uri)
		}))
	}

	const compressVideosUris = async (videosUri: string[]) => {
		return Promise.all(videosUri.map(async (uri) => {
			if ((initialValue || [{ url: '' }]).find((media) => media.url === uri)) return uri
			return compressVideo(uri)
		}))
	}

	return (
		<Container>
			<MediaBrowserModal
				onSelectionConfirmed={mediaBrowserHandler}
				onClose={() => setMediaBrowserOpened(false)}
				maxImages={10 - mediaPack.length ?? 0}
				showMediaBrowser={mediaBrowserOpened}
			/>
			<CustomCameraModal
				setPictureUri={setPictureUri}
				onClose={() => setCameraOpened(false)}
				cameraOpened={cameraOpened}
			/>
			{
				imageCropperOpened && (
					<ImageEditor
						imageUri={mediaPack[mediaIndexSelected]}
						fixedAspectRatio={1 / 1}
						minimumCropDimensions={{
							width: 50,
							height: 50,
						}}
						onEditingCancel={() => setImageCropperOpened(false)}
						onEditingComplete={saveCroppedImage}
					/>
				)
			}
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(80)}
				backgroundColor={backgroundColor}
				withoutPadding
				flexDirection={'column'}
				justifyContent={'space-between'}
			>
				<TopArea>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						fontSize={18}
						message={(mediaPack.length ? 'eaí, gostou?' : 'adiciona a sua foto aí!')}
						highlightedWords={['gostou?', 'novas', 'fotos!']}
					/>
				</TopArea>
				<PicturePreviewContainer>
					{
						mediaPack[mediaIndexSelected]?.mediaType === 'video' ? (
							<VideoPortrait
								height={relativeScreenWidth(89)}
								videoUrl={mediaPack[mediaIndexSelected]?.url}
								width={relativeScreenWidth(90)}
								deleteCurrentVideo={deleteCurrentMedia}
								showVideoPlayer
							/>
						) : (
							<PhotoPortrait
								resizeMode={'cover'}
								pictureUri={mediaPack[mediaIndexSelected]?.url}
								width={relativeScreenWidth(90)}
								height={relativeScreenWidth(89)}
								deleteCurrentPicture={deleteCurrentMedia}
								editCurrentPicture={editCurrentPicture}
							/>
						)
					}

					<VerticalSpacing height={5} />
				</PicturePreviewContainer >
				<HorizontalListPicturesContainer>
					<HorizontalListPictures
						mediaAssets={mediaPack}
						mediaUriSelected={mediaIndexSelected}
						onSelectMedia={setMediaIndexSelected}
					/>
				</HorizontalListPicturesContainer>
			</DefaultHeaderContainer >
			<ButtonsContainer>
				<SmallButton
					onPress={() => { setMediaBrowserOpened(true) }}
					relativeWidth={relativeScreenWidth(20)}
					height={relativeScreenWidth(20)}
					SvgIcon={AddPictureWhiteIcon}
					svgScale={['70%', '70%']}
				/>
				<SmallButton
					onPress={() => { setCameraOpened(true) }}
					relativeWidth={relativeScreenWidth(20)}
					height={relativeScreenWidth(20)}
					SvgIcon={NewPhotoWhiteIcon}
					svgScale={['100%', '100%']}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(35)}
					height={relativeScreenWidth(20)}
					color={theme.green3}
					labelColor={theme.white3}
					SvgIcon={CheckIcon}
					onPress={savePictures}
				/>
			</ButtonsContainer>
		</Container >
	)
}

export { PostPicturePreview }
