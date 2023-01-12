import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.white3};
    border-left-color: ${({ theme }) => theme.black4};
    padding: ${RFValue(15)}px;
    width: 100%;
`

export const Message = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: ${RFValue(20)}px;
    font-family: Arvo_400Regular;
    line-height: ${RFValue(22)}px;
    flex-wrap: wrap;
`
