import { ResizeMode, Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { ImageZoom } from '@likashefqet/react-native-image-zoom'

import { generateVideoThumbnails } from '@utils-ui/common/convertion/generateVideoThumbnail'
import { checkMediaType } from '@utils-ui/common/media/checkMediaType'
import { arrayIsEmpty } from '@utils-ui/common/validation/validateArray'

import {
	GalleryModalContainer,
	ImageContainer,
	GalleryContainer,
	LeftButton,
	RightButton,
	CloseButtonArea,
	ThumbnailListContainer,
	VideoContainer,
	VideoView,
	LoaderContainer
} from './styles'
import AngleLeftWhiteIcon from '@assets/icons/angleLeft-white.svg'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'
import CloseIcon from '@assets/icons/x-white.svg'
import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { Loader } from '@components/Loader'
import { ThumbnailList } from '@components/ThumbnailList'

interface GalleryProps {
	picturesUrl: string[],
	videosUrl: string[],
	showGallery: boolean,
	initialIndex?: number,
	onClose: () => void
}

function GalleryModal({ picturesUrl = [], videosUrl = [], showGallery, initialIndex = 0, onClose }: GalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [hideElements, setHideElements] = useState(false)
	const [isLandscapeMode, setIsLandscapeMode] = useState(false)
	const [isPressingCloseButton, setIsPressingCloseButton] = useState(false)
	const [carouselEnabled, setCarouselEnabled] = useState(true)
	const [videoThumbnails, setVideoThumbnails] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const [screenSizes, setScreenSizes] = useState({
		width: relativeScreenWidth(100),
		height: relativeScreenHeight(100)
	})

	const carouselRef = useRef<any>(null)
	const thumbnailListRef = useRef<any>(null)
	const videoRefs = useRef<{ [key: number]: Video | null }>({})

	useEffect(() => {
		if (showGallery) {
			const enableRotation = async () => {
				await ScreenOrientation.unlockAsync()
			}
			const generateThumbnails = async () => {
				if (!arrayIsEmpty(videosUrl)) {
					const thumbnails = await generateVideoThumbnails(videosUrl)
					setVideoThumbnails(thumbnails as string[])
				}
				setIsLoading(false)
			}
			setCurrentIndex(initialIndex)
			enableRotation()
			ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
				setIsLandscapeMode((orientationInfo.orientation !== 1))
			})
			generateThumbnails()
		} else {
			const disableRotation = async () => {
				await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
			}
			handleVideoPause(currentIndex)
			disableRotation()
			setIsLoading(true)
		}
	}, [showGallery])

	useEffect(() => {
		setCurrentIndex(0)
		goToIndex(0, true)
		if (isLandscapeMode) {
			setScreenSizes({
				width: relativeScreenHeight(100),
				height: relativeScreenWidth(100)
			})
		} else {
			setScreenSizes({
				width: relativeScreenWidth(100),
				height: relativeScreenHeight(100)
			})
		}
	}, [isLandscapeMode])

	useEffect(() => {
		if (thumbnailListRef.current && picturesUrl.length > 0) {
			thumbnailListRef.current.scrollToIndex({
				index: currentIndex,
				animated: true
			})
		}
	}, [currentIndex])

	const mediaUrls = [...videosUrl, ...picturesUrl]
	const hideArrows = (picturesUrl && videosUrl) && ((picturesUrl.length + videosUrl.length) < 2)

	const handleVideoPause = (index: number) => {
		const currentVideoRef = videoRefs.current[index]
		if (currentVideoRef) {
			currentVideoRef.pauseAsync()
		}
	}

	const goToNext = (direction: number) => {
		const length = (picturesUrl.length + videosUrl.length) ?? 0
		const nextIndex = (currentIndex + direction + length) % length
		setCurrentIndex(nextIndex)
		goToIndex(nextIndex)
	}

	const goToIndex = (index: number, noAnimation?: boolean) => {
		carouselRef.current?.scrollTo({ index, animated: !noAnimation })
	}

	const mediaPressHandler = () => {
		setHideElements(!hideElements)
	}

	const handleThumbnailPressed = (id: number) => {
		handleVideoPause(currentIndex)
		setCurrentIndex(id)
		goToIndex(id)
	}

	const closeButtonHandler = () => onClose()

	const imageZoomHandler = (isZooming: boolean) => {
		setHideElements(isZooming)
		setCarouselEnabled(!isZooming)
	}

	const isShowingVideo = (): boolean => {
		return (currentIndex > (videosUrl.length - 1))
	}

	const hideThumbnailList = (): boolean => {
		return hideElements || (!isShowingVideo() && isLandscapeMode)
	}

	const renderPicture = (uri: string) => (
		<ImageContainer
			activeOpacity={1}
			onPress={mediaPressHandler}
		>
			<ImageZoom
				height={relativeScreenHeight(100)}
				onInteractionEnd={() => imageZoomHandler(false)}
				onInteractionStart={() => imageZoomHandler(true)}
				uri={uri}
				resizeMode={'contain'}
			/>
		</ImageContainer>
	)

	const renderVideo = (uri: string, index: number) => (
		<VideoContainer>
			<VideoView
				isLandScapeMode={isLandscapeMode}
				source={{ uri: uri }}
				resizeMode={ResizeMode.CONTAIN}
				isLooping
				useNativeControls
				shouldPlay
				ref={(el) => {
					videoRefs.current[index] = el
				}}
			/>

		</VideoContainer>
	)

	const renderMedia = (uri: string, index: number) => {
		const mediaType = checkMediaType(uri)
		if (mediaType === 'video') {
			return renderVideo(uri, index)
		}
		return renderPicture(uri)
	}

	return (
		<GalleryModalContainer animationType={'slide'} visible={showGallery}>
			{
				isLoading && (
					<LoaderContainer>
						<Loader />
					</LoaderContainer>
				)
			}

			<StatusBar backgroundColor={theme.colors.black[4]} />
			<GalleryContainer>
				<Carousel
					enabled={carouselEnabled}
					ref={carouselRef}
					loop={false}
					width={screenSizes.width}
					height={screenSizes.height}
					data={mediaUrls}
					onSnapToItem={(id) => {
						handleVideoPause(currentIndex)
						setCurrentIndex(id)
					}}
					renderItem={({ item, index }) => renderMedia(item, index)}
				>
				</Carousel>
			</GalleryContainer>

			{
				!hideElements && (
					<>
						<CloseButtonArea isPressing={isPressingCloseButton}>
							<SmallButton
								color={theme.colors.red[3]}
								SvgIcon={CloseIcon}
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								onPress={closeButtonHandler}
								onPressStart={() => setIsPressingCloseButton(true)} // REFACTOR REmover
								onPressRelease={() => setIsPressingCloseButton(false)}
							/>
						</CloseButtonArea>

						{
							!hideArrows && isShowingVideo() && (
								<>
									<LeftButton onPress={() => goToNext(-1)}>
										<AngleLeftWhiteIcon height={relativeScreenDensity(30)} width={relativeScreenDensity(30)} />
									</LeftButton>

									<RightButton onPress={() => goToNext(1)}>
										<AngleRightWhiteIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
									</RightButton>
								</>
							)
						}
					</>
				)
			}

			<ThumbnailListContainer
				key={isLandscapeMode ? 'landscape' : 'portrait'}
				style={{
					opacity: hideThumbnailList() ? 0 : 1,
					zIndex: hideThumbnailList() ? -1 : 1
				}}
			>
				<ThumbnailList
					thumbnailListRef={thumbnailListRef}
					currentIndex={currentIndex}
					onThumbnailPressed={handleThumbnailPressed}
					picturesUrl={([...videoThumbnails, ...picturesUrl])}
					videoQuantity={videoThumbnails.length}
				/>
			</ThumbnailListContainer>

		</GalleryModalContainer>
	)
}

export { GalleryModal }
