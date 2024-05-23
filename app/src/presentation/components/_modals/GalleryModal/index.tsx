import analytics from '@react-native-firebase/analytics'
import firebase from '@react-native-firebase/app'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { RFValue } from 'react-native-responsive-fontsize'

import { ImageZoom } from '@likashefqet/react-native-image-zoom'

import {
	GalleryModalContainer,
	ImageContainer,
	GalleryContainer,
	LeftButton,
	RightButton,
	CloseButtonArea,
	ThumbnailListContainer
} from './styles'
import AngleLeftWhiteIcon from '@assets/icons/angleLeft-white.svg'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'
import CloseIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { ThumbnailList } from '@components/ThumbnailList'

interface GalleryProps {
	picturesUrl: string[],
	videosUrl: string[],
	videoThumbnails?: string[]
	showGallery: boolean,
	onClose: () => void
}

function GalleryModal({ picturesUrl = [], videosUrl = [], videoThumbnails = [], showGallery, onClose }: GalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [hideElements, setHideElements] = useState(false)
	const [isLandscapeMode, setIsLandscapeMode] = useState(false)
	const [isPressingCloseButton, setIsPressingCloseButton] = useState(false)
	const [carouselEnabled, setCarouselEnabled] = useState(true)

	const [screenSizes, setScreenSizes] = useState({
		width: relativeScreenWidth(100),
		height: relativeScreenHeight(100)
	})

	const carouselRef = useRef<any>(null)
	const thumbnailListRef = useRef<any>(null)

	useEffect(() => {
		if (showGallery) {
			const enableRotation = async () => {
				await ScreenOrientation.unlockAsync()
			}
			setCurrentIndex(0)
			enableRotation()
			ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
				setIsLandscapeMode((orientationInfo.orientation !== 1))
			})
		} else {
			const disableRotation = async () => {
				await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
			}
			disableRotation()
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

	const mediaUrls = [/* ...videosUrl,  */...picturesUrl]
	const hideArrows = (picturesUrl /* && videosUrl */) && ((picturesUrl.length/*  + videosUrl.length */) < 2)

	const logEvent = async () => {
		if (!firebase.apps.length) {
			firebase.initializeApp()
		}
		await analytics().logEvent('eu_sou_um_teste', {
			id: 123,
			description: 'exemplo de rquest no analytics',
		})
		console.log('Event logged')
	}

	const goToNext = async (direction: number) => {
		const length = (picturesUrl.length/*  + videosUrl.length */) ?? 0
		const nextIndex = (currentIndex + direction + length) % length
		setCurrentIndex(nextIndex)
		goToIndex(nextIndex)
		logEvent()
	}

	const goToIndex = (index: number, noAnimation?: boolean) => {
		carouselRef.current?.scrollTo({ index, animated: !noAnimation })
	}

	const mediaPressHandler = () => {
		setHideElements(!hideElements)
	}

	const handleThumbnailPressed = (id: number) => {
		setCurrentIndex(id)
		goToIndex(id)
	}

	const closeButtonHandler = () => onClose()

	const imageZoomHandler = (isZooming: boolean) => {
		setHideElements(isZooming)
		setCarouselEnabled(!isZooming)
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

	/* const renderVideo = (uri: string) => (
		<VideoContainer>
			<VideoView
				source={{ uri: uri }}
				resizeMode={ResizeMode.CONTAIN}
				isLooping
				useNativeControls
			/>

		</VideoContainer>
	) */

	const renderMedia = (uri: string) => {
		// const extension = uri?.split('.').pop()?.toLowerCase() ?? ''
		// if (extension.includes('mp4')) {
		// 	return renderVideo(uri)
		// }
		return renderPicture(uri)
	}

	return (
		<GalleryModalContainer animationType={'slide'} visible={showGallery}>
			<StatusBar backgroundColor={theme.black4} />
			<GalleryContainer>
				<Carousel
					enabled={carouselEnabled}
					ref={carouselRef}
					loop={false}
					width={screenSizes.width}
					height={screenSizes.height}
					data={mediaUrls}
					onSnapToItem={(id) => setCurrentIndex(id)}
					renderItem={({ item }) => renderMedia(item)}
				>
				</Carousel>
			</GalleryContainer>

			{
				!hideElements && (
					<>
						<CloseButtonArea isPressing={isPressingCloseButton}>
							<SmallButton
								color={theme.red3}
								SvgIcon={CloseIcon}
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								onPress={closeButtonHandler}
								onPressStart={() => setIsPressingCloseButton(true)}
								onPressRelease={() => setIsPressingCloseButton(false)}
							/>
						</CloseButtonArea>

						{
							!hideArrows && (
								<>
									<LeftButton onPress={() => goToNext(-1)}>
										<AngleLeftWhiteIcon height={RFValue(30)} width={RFValue(30)} />
									</LeftButton>

									<RightButton onPress={() => goToNext(1)}>
										<AngleRightWhiteIcon width={RFValue(30)} height={RFValue(30)} />
									</RightButton>
								</>
							)
						}
					</>
				)
			}

			<ThumbnailListContainer key={isLandscapeMode ? 'landscape' : 'portrait'} style={{ opacity: hideElements ? 0 : 1 }}>
				<ThumbnailList
					thumbnailListRef={thumbnailListRef}
					currentIndex={currentIndex}
					onThumbnailPressed={handleThumbnailPressed}
					picturesUrl={(videoThumbnails ? [...videoThumbnails, ...picturesUrl] : [...picturesUrl])}
				/>
			</ThumbnailListContainer>

		</GalleryModalContainer>
	)
}

export { GalleryModal }

// TODO Videos
