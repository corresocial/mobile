import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.KeyboardAvoidingView`
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
   align-items: center;
`
