import { Asset } from 'expo-media-library'
import React, { useState } from 'react'

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

interface PostPicturePreviewProps {
	backgroundColor: string
	initialValue?: { picturesUrl: string[], videosUrl: string[] }
	navigateBackwards: () => void
	saveMedia: (picturesUrl: string[], videosUrl: string[]) => void
}

function PostPicturePreview({
	backgroundColor,
	initialValue,
	navigateBackwards,
	saveMedia
}: PostPicturePreviewProps) {
	const [picturesPack, setPicturesPack] = useState<string[]>(initialValue?.picturesUrl || [])
	const [videosPack, setVideosPack] = useState<string[]>(initialValue?.videosUrl || [])
	const [mediaIndexSelected, setmediaIndexSelected] = useState<number>(0)
	const [isVideoSelected, setIsVideoSelected] = useState<boolean>(false)
	const [cameraOpened, setCameraOpened] = useState<boolean>(false)
	const [mediaBrowserOpened, setMediaBrowserOpened] = useState<boolean>(false)

	const setPictureUri = (uri: string) => {
		const currentPictures = [...picturesPack]
		currentPictures.push(uri)
		setmediaIndexSelected(picturesPack.length)
		setPicturesPack(currentPictures)
	}

	const deleteCurrentPicture = () => {
		const picturesAfterDelete = picturesPack.filter((_, index) => index !== mediaIndexSelected)
		setmediaIndexSelected(picturesPack.length - 2)
		setPicturesPack(picturesAfterDelete)
	}

	const mediaBrowserHandler = (mediaSelected: Asset[]) => {
		const currentPictures = [...picturesPack]
		const currentVideos = [...videosPack]

		mediaSelected.forEach((media: Asset) => {
			media.mediaType === 'photo' ? currentPictures.push(media.uri) : currentVideos.push(media.uri)
		})

		setPicturesPack(currentPictures)
		setVideosPack(currentVideos)
	}

	const mediaSelectionHandler = (index: number, isVideo: boolean) => {
		console.log(index, isVideo)
		setmediaIndexSelected(index)
		setIsVideoSelected(isVideo)
	}

	return (
		<Container>
			<MediaBrowserModal
				onSelectionConfirmed={mediaBrowserHandler}
				onClose={() => setMediaBrowserOpened(false)}
				showMediaBrowser={mediaBrowserOpened}
			/>
			<CustomCameraModal
				setPictureUri={setPictureUri}
				onClose={() => setCameraOpened(false)}
				cameraOpened={cameraOpened}
			/>
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
						message={'adicione ou remova fotos e vídeos'}
						highlightedWords={['gostou', 'fotos', 'vídeos']}
					/>
				</TopArea>
				<PicturePreviewContainer>
					{
						!isVideoSelected
							? (
								<PhotoPortrait
									resizeMode={'cover'}
									pictureUri={picturesPack[mediaIndexSelected]}
									width={relativeScreenWidth(90)}
									height={relativeScreenWidth(89)}
									deleteCurrentPicture={deleteCurrentPicture}
								/>
							) : (
								<VideoPortrait
									videoUrl={videosPack[mediaIndexSelected]}
									width={relativeScreenWidth(90)}
									height={relativeScreenWidth(89)}

								/>
							)
					}

					<VerticalSpacing height={relativeScreenWidth(7)} />
				</PicturePreviewContainer>
				<HorizontalListPicturesContainer>
					<HorizontalListPictures
						picturesUri={picturesPack}
						isVideoSelected={isVideoSelected}
						videosUri={videosPack}
						pictureUriSelected={mediaIndexSelected}
						onSelectMedia={mediaSelectionHandler}

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
					onPress={() => saveMedia(picturesPack, videosPack)}
				/>
			</ButtonsContainer>
		</Container>
	)
}

export { PostPicturePreview }
