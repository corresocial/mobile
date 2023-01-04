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

export const ButtonsContainer = styled.View`
   width: 100%;
   flex-direction: row;
   justify-content: space-between;
`

export const Sigh = styled.View`
   height: 100%;
   width: ${RFValue(10)}px;
`
