import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const ContainerBottom = styled.View`
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(20)}px;

`

export const ContainerSurface = styled.View`
    border: ${relativeScreenDensity(2.2)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(20)}px;
    align-items: center;
    justify-content: center;
	  padding: ${relativeScreenDensity(1)}px ${relativeScreenDensity(12)}px;
    height: 100%;
`

export const Label = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
    font-family: Arvo_700Bold;
    text-align: center;
`
