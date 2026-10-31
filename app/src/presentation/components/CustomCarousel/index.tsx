import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'

import {
	CarouselActiveIndicatorItem,
	CarouselInactiveIndicatorItem,
	CarouselIndicatorContainer
} from './styles'
import { screenWidth } from '@common/screenDimensions'

const AUTOPLAY_INTERVAL = 3000

interface CustomCarouselProps {
	activeIndicatorColor?: string
	children: ReactElement[]
}

/**
 * Paginador horizontal com autoplay e indicadores.
 * Usa ScrollView em vez do react-native-reanimated-carousel porque, no Android, só o primeiro item
 * recebia o toque (os demais eram apenas desenhados via transform), o que impedia abrir o calendário de eventos.
 */
function CustomCarousel({ activeIndicatorColor, children }: CustomCarouselProps) {
	const pages = React.Children.toArray(children)
	const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0)
	const scrollViewRef = useRef<ScrollView>(null)

	useEffect(() => {
		if (pages.length < 2) return undefined
		const timer = setTimeout(() => {
			const nextIndex = (currentCarouselIndex + 1) % pages.length
			scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true })
			setCurrentCarouselIndex(nextIndex)
		}, AUTOPLAY_INTERVAL)
		return () => clearTimeout(timer)
	}, [currentCarouselIndex, pages.length])

	const onScrollEnd = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		setCurrentCarouselIndex(Math.round(nativeEvent.contentOffset.x / screenWidth))
	}

	const renderCarouselIndicators = () => pages.map((page, index) => {
		const key = (page as ReactElement).key ?? `indicator-${index}`
		return index === currentCarouselIndex
			? <CarouselActiveIndicatorItem key={key} activeIndicatorColor={activeIndicatorColor} />
			: <CarouselInactiveIndicatorItem key={key} />
	})

	return (
		<>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				bounces={false}
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={onScrollEnd}
				style={{ flexGrow: 0 }}
			>
				{pages.map((page, index) => (
					<View key={(page as ReactElement).key ?? `page-${index}`} style={{ width: screenWidth }}>
						{page}
					</View>
				))}
			</ScrollView>
			<CarouselIndicatorContainer>
				{renderCarouselIndicators()}
			</CarouselIndicatorContainer>
		</>
	)
}

export { CustomCarousel }
