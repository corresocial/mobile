import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '../../contexts/AuthContext';

function Splash({ navigation, route }: SplashScreenProps) {
    const { getDataFromSecureStore } = useContext(AuthContext)

    const [imagesSvgOpacity] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(imagesSvgOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()


        setTimeout(() => {
            redirectToApp()
        }, 2000)
    })

    const redirectToApp = async () => {
        try {
            const user = await getDataFromSecureStore('corre.user')
            console.log(user)

            if (user) {
                navigation.navigate('Home')
            } else {
                if (user == null) {
                    navigation.navigate('AcceptAndContinue')
                } else {
                    throw 'Usuário não authenticado localmente!'
                }
            }
        } catch (err) {
            setTimeout(() => {
                redirectToApp()
            }, 3000)
        }
    }

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