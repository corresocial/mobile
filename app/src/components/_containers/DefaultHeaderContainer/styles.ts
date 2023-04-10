import styled from 'styled-components/native'
import Constants from 'expo-constants'
import { Animated, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { relativeScreenHeight } from '../../../common/screenDimensions'

export const Container = styled(Animated.View)`
	padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : relativeScreenHeight(1.5)}px;
    border-bottom-width: ${RFValue(5)}px;
    border-bottom-color:  ${({ theme }) => theme.black4};
    transition: background-color 1s ease;
    flex-direction: row;
`
