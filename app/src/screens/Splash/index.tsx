import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';

import {
    Container,
    BuildingsContainer,
    BottomLine,
    LogoContainer
} from './styles'

import BuildingsSVG from './../../assets/svgs/buildings.svg'
import LogoSVG from './../../assets/svgs/logo.svg'
import { screenHeight, screenWidth } from '../../common/screenDimensions';
import { SplashScreenProps } from '../../routes/Stack/screenProps';

function Splash({navigation}: SplashScreenProps) {
    const [imagesSvgOpacity, setImagesSvgOpacity] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(imagesSvgOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()

        setTimeout(() => {
            navigation.navigate('AcceptAndContinue')
        }, 2000)
    })

    return (
        <Container>
            <LogoContainer style={{ opacity: imagesSvgOpacity }}>
                <LogoSVG width={screenWidth * 0.5} height={screenHeight} />
            </LogoContainer>
            <BuildingsContainer style={{ opacity: imagesSvgOpacity }}>
                <BuildingsSVG width={screenWidth * 0.4} height={screenHeight * 0.12} />
            </BuildingsContainer>
            <BottomLine />
        </Container>
    );
}

export { Splash }