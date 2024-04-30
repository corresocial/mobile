import ImageEditor from 'expo-image-cropper'
import { Asset } from 'expo-media-library'
import React, { useState } from 'react'

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

import { HorizontalListPictures } from '../../HorizontalListPictures'
import { PhotoPortrait } from '../../PhotoPortrait'

const { compressImage } = UiUtils()

interface PostPicturePreviewProps {
	backgroundColor: string
	initialValue?: string[] /* { picturesUrl: string[], videosUrl: string[] } */
	navigateBackwards: () => void
	saveMedia: (picturesUrl: string[]) => void
}

function PostPicturePreview({
	backgroundColor,
	initialValue,
	navigateBackwards,
	saveMedia
}: PostPicturePreviewProps) {
	const [picturesPack, setPicturesPack] = useState<string[]>(initialValue || [])
	// const [videosPack, setVideosPack] = useState<string[]>(/* initialValue?.videosUrl || */[])
	const [mediaIndexSelected, setMediaIndexSelected] = useState<number>(0)
	// const [isVideoSelected, setIsVideoSelected] = useState<boolean>(false)
	const [cameraOpened, setCameraOpened] = useState<boolean>(false)
	const [mediaBrowserOpened, setMediaBrowserOpened] = useState<boolean>(false)
	const [imageCropperOpened, setImageCropperOpened] = useState<boolean>(false)

	const [hasSelectedMedia, setHasSelectedMedia] = useState<boolean>(false)

	const setPictureUri = (uri: string) => {
		const currentPictures = [...picturesPack]
		currentPictures.push(uri)
		setMediaIndexSelected(picturesPack.length)
		setPicturesPack(currentPictures)
		setHasSelectedMedia(true)
	}

	const deleteCurrentPicture = () => {
		const picturesAfterDelete = picturesPack.filter((_, index) => index !== mediaIndexSelected)
		setMediaIndexSelected(picturesPack.length - 2)
		setPicturesPack(picturesAfterDelete)
	}

	const editCurrentPicture = () => {
		setImageCropperOpened(true)
	}

	const saveCroppedImage = (image: any) => {
		const newPicturesPack = [...picturesPack]
		newPicturesPack[mediaIndexSelected] = image.uri
		setPicturesPack(newPicturesPack)
		setImageCropperOpened(false)
	}

	const mediaBrowserHandler = (mediaSelected: Asset[]) => {
		const currentPictures = [...picturesPack]
		// const currentVideos = [...videosPack]

		mediaSelected.forEach((media: Asset) => {
			currentPictures.push(media.uri)
			// media.mediaType === 'photo' ? currentPictures.push(media.uri) : currentVideos.push(media.uri)
		})

		setPicturesPack(currentPictures)
		setHasSelectedMedia(true)
		// setVideosPack(currentVideos)
	}

	const savePictures = async (picturesUri: string[]) => {
		const compressedUris = await compressPicturesUris(picturesUri)
		saveMedia(compressedUris)
	}

	const compressPicturesUris = async (picturesUri: string[]) => {
		return Promise.all(picturesUri.map(async (uri) => compressImage(uri)))
	}

	// const mediaSelectionHandler = (index: number, isVideo: boolean) => {
	// 	setMediaIndexSelected(index)
	//  setIsVideoSelected(isVideo)
	// }

	return (
		<Container>
			<MediaBrowserModal
				onSelectionConfirmed={mediaBrowserHandler}
				onClose={() => setMediaBrowserOpened(false)}
				maxImages={10 - picturesPack.length}
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
						imageUri={picturesPack[mediaIndexSelected]}
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
						message={(hasSelectedMedia ? 'eaí, gostou?' : 'selecione novas fotos!')}
						highlightedWords={['gostou?', 'novas', 'fotos!']}
					/>
				</TopArea>
				<PicturePreviewContainer>
					<PhotoPortrait
						resizeMode={'cover'}
						pictureUri={picturesPack[mediaIndexSelected]}
						width={relativeScreenWidth(90)}
						height={relativeScreenWidth(89)}
						deleteCurrentPicture={deleteCurrentPicture}
						editCurrentPicture={editCurrentPicture}
					/>
					<VerticalSpacing height={relativeScreenWidth(7)} />
				</PicturePreviewContainer>
				<HorizontalListPicturesContainer>
					<HorizontalListPictures
						picturesUri={picturesPack}
						// videosUri={videosPack}
						pictureUriSelected={mediaIndexSelected}
						onSelectMedia={setMediaIndexSelected}
					/>
				</HorizontalListPicturesContainer>
			</DefaultHeaderContainer>
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
					flexDirection={'row-reverse'}
					relativeWidth={relativeScreenWidth(35)}
					height={relativeScreenWidth(20)}
					color={theme.green3}
					labelColor={theme.white3}
					SvgIcon={CheckIcon}
					onPress={async () => savePictures(picturesPack)}
				/>
			</ButtonsContainer>
		</Container>
	)
}

export { PostPicturePreview }
