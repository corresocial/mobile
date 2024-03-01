import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useRef, useState } from 'react'
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
    showGallery: boolean,
	onClose: () => void
}

function GalleryModal({ picturesUrl, showGallery, onClose }: GalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [hideElements, setHideElements] = useState(false)

	const [orientation, setOrientation] = useState('PORTRAIT')

	const [screenDimensions, setScreenDimensions] = useState({
		screenWidth: relativeScreenWidth(100),
		screenHeight: relativeScreenHeight(100)
	})

	const carouselRef = useRef<any>(null)
	const thumbnailListRef = useRef<any>(null)

	useEffect(() => {
		const enableRotation = async () => {
			await ScreenOrientation.unlockAsync()
		}

		const updateOrientation = async () => {
			const { orientationInfo } = await ScreenOrientation.getOrientationAsync()
			setOrientation(orientationInfo.orientation)
		}

		enableRotation()
		updateOrientation()

		const orientationSubscription = ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
			setOrientation(orientationInfo.orientation)
		})

		return () => {
			orientationSubscription.remove()
			const blockRotation = async () => {
				await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
			}
			blockRotation()
		}
	}, [])

	useEffect(() => {
		if (thumbnailListRef.current && picturesUrl.length > 0) {
			thumbnailListRef.current.scrollToIndex({
				index: currentIndex,
				animated: true
			})
		}
	}, [currentIndex])

	const goToNext = (direction: number) => {
		const { length } = picturesUrl
		const nextIndex = (currentIndex + direction + length) % length
		setCurrentIndex(nextIndex)
		goToIndex(nextIndex)
	}

	const goToIndex = (index: number) => {
		carouselRef.current?.scrollTo({ index, animated: true })
	}

	const imagePressHandler = () => {
		setHideElements(!hideElements)
	}

	const handleThumbnailPressed = (id: number) => {
		setCurrentIndex(id)
		goToIndex(id)
	}

	return (
		<GalleryModalContainer animationType={'slide'} visible={showGallery}>
			<GalleryContainer>
				<Carousel
					ref={carouselRef}
					loop={false}
					width={screenDimensions.screenWidth}
					height={screenDimensions.screenHeight}
					data={picturesUrl}
					onSnapToItem={(id) => setCurrentIndex(id)}
					renderItem={({ item }) => (
						<ImageContainer activeOpacity={1} onPress={imagePressHandler}>
							<ImageZoom
								onInteractionEnd={() => setHideElements(false)}
								onInteractionStart={() => setHideElements(true)}
								uri={item}
								resizeMode={'contain'}
							/>
						</ImageContainer>
					)}
				>
				</Carousel>
			</GalleryContainer>

			{
				!hideElements && (
					<>
						<CloseButtonArea>
							<SmallButton
								color={theme.red3}
								SvgIcon={CloseIcon}
								relativeWidth={relativeScreenWidth(12)}
								height={relativeScreenWidth(12)}
								onPress={onClose}
							/>
						</CloseButtonArea>

						<LeftButton onPress={() => goToNext(-1)}>
							<AngleLeftWhiteIcon height={RFValue(30)} width={RFValue(30)}/>
						</LeftButton>

						<RightButton onPress={() => goToNext(1)}>
							<AngleRightWhiteIcon width={RFValue(30)} height={RFValue(30)}/>
						</RightButton>
					</>
				)
			}

			<ThumbnailListContainer style={{ opacity: hideElements ? 0 : 1 }}>
				<ThumbnailList
					thumbnailListRef={thumbnailListRef}
					currentIndex={currentIndex}
					onThumbnailPressed={handleThumbnailPressed}
					picturesUrl={picturesUrl}
				/>
			</ThumbnailListContainer>

		</GalleryModalContainer>
	)
}

export { GalleryModal }
