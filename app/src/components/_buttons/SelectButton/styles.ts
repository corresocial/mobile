import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const ContainerBottom = styled.View`
    background-color: ${({ theme }) => theme.black4};
    border-radius: 15px;
    position: relative;
`

export const ContainerSurface = styled.View`
    border: 2.5px solid ${({ theme }) => theme.black4}
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    
    height: 100%;
    width: 100%;
    position: absolute;
    right: ${RFValue(8)}px;
`

export const Label = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: Arvo_700Bold;
    padding-horizontal: ${RFValue(12)}px;
    padding-vertical: ${RFValue(5)}px;
    text-align:center;
`