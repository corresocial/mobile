import React, { ReactElement, useState } from 'react'
import { View, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import uuid from 'react-uuid'

import { RFValue } from 'react-native-responsive-fontsize'
import {
	CarouselActiveIndicatorItem,
	CarouselInactiveIndicatorItem,
	CarouselIndicatorContainer
} from './styles'
import { screenHeight, screenWidth } from '../../common/screenDimensions'
import { PhotoPortrait } from '../PhotoPortrait'

interface ImageCarouselProps {
	marginVertical?: number
	picturesUrl: string[] | undefined
}

function ImageCarousel({ marginVertical = 0, picturesUrl = ['https://cdn-icons-png.flaticon.com/512/1695/1695213.png'] }: ImageCarouselProps) {
	const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0)

	const renderCarouselIndicators = () => picturesUrl.map((_, index) => (
		index === currentCarouselIndex
			? <CarouselActiveIndicatorItem key={uuid()}></CarouselActiveIndicatorItem>
			: <CarouselInactiveIndicatorItem key={uuid()}></CarouselInactiveIndicatorItem>
	))

	const getCarouselPicture = () => picturesUrl.map((url) => (
		<View
			style={{
				width: '100%',
				height: screenHeight * 0.28,
			}}
		>
			<PhotoPortrait
				borderWidth={2}
				borderRightWidth={7}
				height={'100%'}
				width={'100%'}
				pictureUri={url}
				maxWidth={screenWidth * 0.93}
				resizeMode={'cover'}
			/>
		</View>
	))

	return (
		<View
			style={{
				width: '100%',
				height: screenHeight * 0.28,
				marginVertical: RFValue(marginVertical)
			}}
		>
			<Carousel
				data={getCarouselPicture()}
				autoPlay={picturesUrl.length > 1}
				width={screenWidth}
				height={screenHeight * 0.28}
				autoPlayInterval={3000}
				style={{
					width: '100%',
					height: '100%'
				}}
				loop
				renderItem={({ item, index }) => item}
				onSnapToItem={(index: number) => setCurrentCarouselIndex(index)}
			/>
			<CarouselIndicatorContainer>
				{renderCarouselIndicators()}
			</CarouselIndicatorContainer>
		</View>

	)
}

export { ImageCarousel }
