import React, { useContext, useEffect, useState } from 'react';
import { Animated } from 'react-native';

import {
    Container,
    BuildingsContainer,
    BottomLine,
    LogoContainer
} from './styles'
import { screenHeight, screenWidth } from '../../common/screenDimensions';
import BuildingsSVG from './../../assets/icons/buildings.svg'
import LogoSVG from './../../assets/icons/logo.svg'

import { SplashScreenProps } from '../../routes/Stack/_stackScreenProps';
import { AuthContext } from '../../contexts/AuthContext';

function Splash({ navigation }: SplashScreenProps) {
    const { getDataFromSecureStore} = useContext(AuthContext)

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
            const user = await getDataFromSecureStore('corre.userteste', true)
            
            console.log(user)
            if (user) {
                navigation.navigate('UserStack')
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