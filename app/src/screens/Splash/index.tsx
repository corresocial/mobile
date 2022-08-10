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
import { screenHeight, screenWidth } from '../../commonStyles/screenDimensions';


function Splash() {
    const [imagesSvgOpacity, setImagesSvgOpacity] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(imagesSvgOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
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