import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
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
	const [isLandscapeMode, setIsLandscapeMode] = useState(false)
	const [isPressingCloseButton, setIsPressingCloseButton] = useState(false)

	const carouselRef = useRef<any>(null)
	const thumbnailListRef = useRef<any>(null)

	useEffect(() => {
		if (showGallery) {
			const enableRotation = async () => {
				await ScreenOrientation.unlockAsync()
			}
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

	const closeButtonHandler = () => onClose()

	return (
		<GalleryModalContainer animationType={'slide'} visible={showGallery}>
			<GalleryContainer>
				<Carousel
					ref={carouselRef}
					loop={false}
					width={relativeScreenWidth(100)}
					height={isLandscapeMode ? relativeScreenHeight(70) : relativeScreenHeight(100)}
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
