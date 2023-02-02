import Constants from 'expo-constants'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
`

export const ButtonsContainer = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.orange2};
   justify-content: space-around;
   padding: ${relativeScreenWidth(7)}px;
`

export const Sigh = styled.View`
   height: 100%;
   width: ${relativeScreenWidth(3)}px;
`
