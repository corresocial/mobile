import Constants from 'expo-constants'
import { Animated, Platform } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	withoutIOSPadding?: boolean
}

export const Container = styled(Animated.View) <ContainerProps>`
	padding-top: ${({ withoutIOSPadding }) => (Platform.OS === 'ios' && !withoutIOSPadding ? Constants.statusBarHeight : relativeScreenHeight(1.5))}px;
    border-bottom-width: ${relativeScreenDensity(5)}px;
    border-bottom-color:  ${({ theme }) => theme.colors.black[4]};
    transition: background-color 1s ease;
    flex-direction: row;
`

export const FooterTextArea = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
 	padding: ${relativeScreenDensity(10)}px;
`
