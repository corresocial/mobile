import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const Body = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.white2};
   justify-content: space-around;
   padding: ${RFValue(25)}px;
`
