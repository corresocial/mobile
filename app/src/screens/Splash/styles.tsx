import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.orange3};
    align-items: center;
    justify-content: center;
    position: relative;
`

export const LogoContainer = styled(Animated.View)``

export const SplashInfoText = styled.Text`
	margin-top: ${RFValue(10)}px;
	font-family: Arvo_400Regular;
	font-size: ${RFValue(10)}px;
	color: ${({ theme }) => theme.black4};
	text-align: center;
`
