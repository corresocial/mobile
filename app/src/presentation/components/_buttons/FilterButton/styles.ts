import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const ContainerBottom = styled.View`
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(8)}px;
`

export const ContainerSurface = styled.View`
    border: ${RFValue(2)}px solid ${({ theme }) => theme.black4};
    border-radius: ${RFValue(8)}px;
    align-items: center;
    justify-content: center;
	padding: 0px ${RFValue(7)}px;

    height: 100%;
    right: ${RFValue(5)}px;
`

export const Label = styled.Text`
    font-size: ${RFValue(13)}px;
    font-family: Arvo_700Bold;
    text-align: center;

`
