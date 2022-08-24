import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import {
    CarouselActiveIndicatorItem,
    CarouselInactiveIndicatorItem,
    CarouselIndicatorContainer
} from './styles';

import { screenHeight, screenWidth } from '../../common/screenDimensions';

interface CustomCarousel {
    children: ReactElement[]
}

function CustomCarousel(props: CustomCarousel) {
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0)

    const renderCarouselIndicators = () => {
        return [...props.children].map((_, index) => {
            return (
                index == currentCarouselIndex
                    ? <CarouselActiveIndicatorItem key={index}></CarouselActiveIndicatorItem>
                    : <CarouselInactiveIndicatorItem key={index}></CarouselInactiveIndicatorItem>
            )
        })
    }

    return (
        <>
            <Carousel
                data={props.children}
                autoPlay={true}
                width={screenWidth}
                height={screenHeight}
                autoPlayInterval={3000}
                loop={true}
                renderItem={({ item, index }) => (
                    <View >
                        {props.children[index]}
                    </View>
                )}
                onSnapToItem={(index: number) => setCurrentCarouselIndex(index)}
            />
            <CarouselIndicatorContainer>
                {renderCarouselIndicators()}
            </CarouselIndicatorContainer>
        </>

    );
}

export { CustomCarousel }