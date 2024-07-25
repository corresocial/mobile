import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const ContainerBottom = styled.View`
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(20)}px;

`

export const ContainerSurface = styled.View`
    border: ${RFValue(2.2)}px solid ${({ theme }) => theme.black4};
    border-radius: ${RFValue(20)}px;
    align-items: center;
    justify-content: center;
	padding: ${RFValue(1)}px ${RFValue(12)}px;

    height: 100%;
`

export const Label = styled.Text`
    font-size: ${RFValue(13)}px;
    font-family: Arvo_700Bold;
    text-align: center;
`
