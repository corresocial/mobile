import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const ContainerBottom = styled.View`
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(8)}px;
    position: relative;
`

export const ContainerSurface = styled.View`
    border: 2px solid ${({ theme }) => theme.black4}
    border-radius: ${RFValue(8)}px;
    align-items: center;
    justify-content: center;

    height: 100%;
    position: absolute;
    right: ${RFValue(5)}px;
`

export const Label = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: Arvo_700Bold;
    text-align:center;
`
