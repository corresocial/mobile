import React, { ReactElement, useState } from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import uuid from "react-uuid";

import {
	CarouselActiveIndicatorItem,
	CarouselInactiveIndicatorItem,
	CarouselIndicatorContainer,
} from "./styles";
import { screenHeight, screenWidth } from "@common/screenDimensions";

interface CustomCarouselProps {
	children: ReactElement[];
}

function CustomCarousel({ children }: CustomCarouselProps) {
	const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);

	const renderCarouselIndicators = () =>
		children.map((_, index) =>
			index === currentCarouselIndex ? (
				<CarouselActiveIndicatorItem
					key={uuid()}
				></CarouselActiveIndicatorItem>
			) : (
				<CarouselInactiveIndicatorItem
					key={uuid()}
				></CarouselInactiveIndicatorItem>
			)
		);

	return (
		<>
			<Carousel
				data={children}
				autoPlay
				width={screenWidth}
				height={screenHeight}
				autoPlayInterval={3000}
				loop
				renderItem={({ item, index }) => <View>{children[index]}</View>}
				onSnapToItem={(index: number) => setCurrentCarouselIndex(index)}
			/>
			<CarouselIndicatorContainer>
				{renderCarouselIndicators()}
			</CarouselIndicatorContainer>
		</>
	);
}

export { CustomCarousel };
