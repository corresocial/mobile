import styled from 'styled-components/native'
import { screenWidth } from '../../../common/screenDimensions'

export const ContainerBottom  = styled.View`
    background-color: ${({theme}) => theme.black4};
    border-radius: 15px;
    position: relative;
`

export const ContainerSurface  = styled.View`
    border: 2.5px solid ${({theme}) => theme.black4}
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    
    height: 100%;
    width: 100%;
    position: absolute;
    right: 5px;
`

export const Label = styled.Text`
    font-size: 16px;
    font-family: Arvo_700Bold;
    padding: 20px;
    text-align:center;
`