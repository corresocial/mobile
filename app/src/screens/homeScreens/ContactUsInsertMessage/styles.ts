import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
	padding-top:${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
`

export const Body = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.white2};
   justify-content: space-around;
   padding: ${RFValue(25)}px;
`

export const ButtonsContainer = styled.View`
   width: 100%;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`
