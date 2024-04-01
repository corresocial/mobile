import React, { useState } from 'react'
import { View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { RFValue } from 'react-native-responsive-fontsize'
import uuid from 'react-uuid'

import {
	CarouselActiveIndicatorItem,
	CarouselInactiveIndicatorItem,
	CarouselIndicatorContainer,
	FullScreenIconContainer
} from './styles'
import FullscreenIcon from '@assets/icons/fullscreen-white.svg'
import { relativeScreenHeight, relativeScreenWidth, screenWidth } from '@common/screenDimensions'

import { PhotoPortrait } from '../PhotoPortrait'

interface ImageCarouselProps {
	marginVertical?: number
	indicatorColor?: string
	withoutBorder?: boolean
	relativeWidth?: number
	square?: boolean
	showFullscreenIcon?: boolean
	picturesUrl: string[] | undefined
}

function ImageCarousel({
	marginVertical = 0,
	indicatorColor,
	withoutBorder,
	relativeWidth = relativeScreenWidth(94),
	square,
	showFullscreenIcon,
	picturesUrl = ['https://cdn-icons-png.flaticon.com/512/1695/1695213.png']
}: ImageCarouselProps) {
	const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0)

	const renderCarouselIndicators = () => picturesUrl.map((_, index) => (
		index === currentCarouselIndex
			? <CarouselActiveIndicatorItem key={uuid()} indicatorColor={indicatorColor} />
			: <CarouselInactiveIndicatorItem key={uuid()} indicatorColor={indicatorColor} />
	))

	const getCarouselPicture = () => picturesUrl.map((url) => (
		<View
			style={{
				width: '100%',
				height: square ? relativeWidth : relativeScreenHeight(28),
				overflow: 'hidden',
				borderWidth: 0,
			}}
		>
			<PhotoPortrait
				borderWidth={withoutBorder ? 0 : 2.5}
				borderRightWidth={withoutBorder ? 0 : 10}
				height={'100%'}
				width={'100%'}
				pictureUri={url}
				maxWidth={relativeWidth}
				resizeMode={'cover'}
			/>
		</View>
	))

	return (
		<View
			style={{
				width: '100%',
				height: square ? relativeWidth : relativeScreenHeight(28),
				marginVertical: RFValue(marginVertical)
			}}
		>	
			{
				showFullscreenIcon && (
					<FullScreenIconContainer>
						<FullscreenIcon/>
					</FullScreenIconContainer>
				) 
			}
			
			<Carousel
				data={getCarouselPicture()}
				autoPlay={picturesUrl.length > 1}
				width={screenWidth}
				height={relativeScreenHeight(28)}
				autoPlayInterval={3000}
				style={{
					width: '100%',
					height: '100%'
				}}
				loop
				enabled={picturesUrl.length !== 1}
				renderItem={({ item, index }) => item}
				onSnapToItem={(index: number) => setCurrentCarouselIndex(index)}
			/>
			<CarouselIndicatorContainer>
				{renderCarouselIndicators()}
			</CarouselIndicatorContainer>
		</View >

	)
}

export { ImageCarousel }
