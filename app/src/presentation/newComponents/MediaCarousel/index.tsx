import React, { useState } from 'react'
import { View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { RFValue } from 'react-native-responsive-fontsize'
import uuid from 'react-uuid'

import {
	CarouselActiveIndicatorItem,
	CarouselInactiveIndicatorItem,
	CarouselIndicatorContainer,
	Container,
	FullScreenIconContainer
} from './styles'
import FullscreenIcon from '@assets/icons/fullscreen-white.svg'
import { relativeScreenHeight, relativeScreenWidth, screenWidth } from '@common/screenDimensions'

import { PhotoPortrait } from '@components/PhotoPortrait'

interface MediaCarouselProps {
	marginVertical?: number
	indicatorColor?: string
	relativeWidth?: number
	square?: boolean
	showFullscreenIcon?: boolean
	picturesUrl: string[] | undefined
	videosThumbnails?: string[]
}

function MediaCarousel({
	marginVertical = 0,
	indicatorColor,
	relativeWidth = relativeScreenWidth(94),
	square,
	showFullscreenIcon,
	picturesUrl = [],
	videosThumbnails = []
}: MediaCarouselProps) {
	const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0)

	const renderCarouselIndicators = () => [...picturesUrl, ...videosThumbnails].map((_, index) => (
		index === currentCarouselIndex
			? <CarouselActiveIndicatorItem key={uuid()} indicatorColor={indicatorColor} />
			: <CarouselInactiveIndicatorItem key={uuid()} indicatorColor={indicatorColor} />
	))

	const getCarouselPictures = () => [...picturesUrl, ...videosThumbnails].map((url) => (
		<View
			style={{
				height: square ? relativeWidth : relativeScreenHeight(28),
				overflow: 'hidden',
				borderWidth: 0,
			}}
		>
			<PhotoPortrait
				borderWidth={0}
				borderRightWidth={0}
				height={'100%'}
				width={'100%'}
				pictureUri={url}
				maxWidth={relativeWidth}
				resizeMode={'cover'}
				videoIndicator={url.includes('videosThumbnails')}
			/>
		</View>
	))

	return (
		<Container
			style={{
				width: '100%',
				height: square ? relativeWidth : relativeScreenHeight(28),
				marginVertical: RFValue(marginVertical)
			}}
		>
			{
				showFullscreenIcon && (
					<FullScreenIconContainer>
						<FullscreenIcon />
					</FullScreenIconContainer>
				)
			}
			<Carousel
				data={getCarouselPictures()}
				autoPlay={(picturesUrl.length + videosThumbnails.length) > 1}
				width={screenWidth}
				height={relativeScreenHeight(28)}
				autoPlayInterval={3000}
				style={{
					width: '100%',
					height: '100%'
				}}
				loop
				enabled={(picturesUrl.length + videosThumbnails.length) !== 1}
				renderItem={({ item, index }) => item}
				onSnapToItem={(index: number) => setCurrentCarouselIndex(index)}
			/>
			<CarouselIndicatorContainer>
				{renderCarouselIndicators()}
			</CarouselIndicatorContainer>
		</Container >

	)
}

export { MediaCarousel }
