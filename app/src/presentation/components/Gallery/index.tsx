import React, { useEffect, useRef, useState } from 'react'
import { Text, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { RFValue } from 'react-native-responsive-fontsize'

import { ImageZoom } from '@likashefqet/react-native-image-zoom'

import { 
	GalleryModal,
	ImageContainer,
	GalleryContainer,
	CloseButton,
	LeftButton,
	RightButton 
} from './styles'
import AngleLeftWhiteIcon from '@assets/icons/angleLeft-white.svg'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'
import CloseIcon from '@assets/icons/x-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'

import { ThumbnailList } from '../ThumbnailList'

interface GalleryProps {
    imagesToShow: any[],
    showGallery: boolean
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

function Gallery({ imagesToShow, showGallery }: GalleryProps) {
	const [isGalleryVisible, setIsGalleryVisible] = useState(showGallery)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [hideElements, setHideElements] = useState(false)

	const [screenDimensions, setScreenDimensions] = useState({
		screenWidth: Dimensions.get('window').width,
		screenHeight: Dimensions.get('window').height
	})

	const carouselRef = useRef<any>(null)
	const thumbnailListRef = useRef<any>(null)

	console.log('oi')

	useEffect(() => {
		if (thumbnailListRef.current && imagesToShow.length > 0) {
			thumbnailListRef.current.scrollToIndex({
				index: currentIndex,
				animated: true
			})
		}
	}, [currentIndex])

	const goToNext = (direction: number) => {
		const { length } = imagesToShow
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
		<GalleryModal visible={isGalleryVisible}>
			<GalleryContainer>
				<Carousel
					ref={carouselRef}
					loop={false}
					width={screenDimensions.screenWidth}
					height={screenDimensions.screenHeight}
					data={imagesToShow}
					onSnapToItem={(id) => setCurrentIndex(id)}
					renderItem={({ item }): any => { // item == url
						return (
							<ImageContainer activeOpacity={1} onPress={imagePressHandler}>
								<ImageZoom 
									onInteractionEnd={() => setHideElements(false)}
									onInteractionStart={() => setHideElements(true)}
									uri={item} 
									resizeMode={'contain'}
								/>
							</ImageContainer>
						)
					}} 
				>      
				</Carousel>
			</GalleryContainer>

			{!hideElements && ( 
				<>
					<SmallButton
						color={theme.red1}
						SvgIcon={CloseIcon}
						relativeWidth={relativeScreenWidth(12)}
						height={relativeScreenWidth(12)}
						onPress={() => setIsGalleryVisible(false)}
					/>

					<LeftButton onPress={() => goToNext(-1)}>
						<AngleLeftWhiteIcon height={RFValue(30)} width={RFValue(30)}/>
					</LeftButton>
                    
					<RightButton onPress={() => goToNext(1)}>
						<AngleRightWhiteIcon width={RFValue(30)} height={RFValue(30)}/>
					</RightButton>
                    
					<ThumbnailList
						thumbnailListRef={thumbnailListRef}
						currentIndex={currentIndex}
						onThumbnailPressed={handleThumbnailPressed}
						images={imagesToShow}
					/>
				</>
			)}

		</GalleryModal>
	)
}

export { Gallery }