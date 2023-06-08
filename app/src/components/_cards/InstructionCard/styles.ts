import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.white3};
    border-left-color: ${({ theme }) => theme.black4};
    width: 100%;
`

export const Message = styled.Text`
    color: ${({ theme }) => theme.black4};
    font-size: ${RFValue(20)}px;
    font-family: Arvo_400Regular;
    line-height: ${RFValue(22)}px;
    flex-wrap: wrap;
`

export const MessageTitle = styled.Text`
	font-size: ${RFValue(22)}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.black4};
`
