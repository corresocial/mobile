import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const ContainerBottom = styled.View`
	margin-left: 10px;
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(20)}px;
    align-items: center;
    align-self: center;
`

export const ContainerSurface = styled.View`
	border-radius: ${relativeScreenDensity(20)}px;
	border: ${relativeScreenDensity(3.5)}px solid ${({ theme }) => theme.colors.black[4]};
	padding-top: 5px;
	padding-bottom: 5px;
    align-items: center;
    justify-content: center;
    width: 100%;
	flex-direction: row;
`

export const Label = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[5]}px;
    font-family: Arvo_700Bold;
    padding: ${relativeScreenHeight(0.7)}px ${relativeScreenWidth(3)}px;
    text-align: center;
`
