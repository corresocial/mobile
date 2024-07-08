import Constants from 'expo-constants'
import { Animated, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

interface ContainerProps {
	withoutIOSPadding?: boolean
}

export const Container = styled(Animated.View) <ContainerProps>`
	padding-top: ${({ withoutIOSPadding }) => (Platform.OS === 'ios' && !withoutIOSPadding ? Constants.statusBarHeight : relativeScreenHeight(1.5))}px;
    border-bottom-width: ${RFValue(5)}px;
    border-bottom-color:  ${({ theme }) => theme.black4};
    transition: background-color 1s ease;
    flex-direction: row;
`

export const FooterTextArea = styled.View`
	background-color: ${({ theme }) => theme.white3};
 	padding: ${RFValue(10)}px;
`
