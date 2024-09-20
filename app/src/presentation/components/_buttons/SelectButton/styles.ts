import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const ContainerBottom = styled.View`
	margin-left: 10px;
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(20)}px;
    align-items: center;
    align-self: center;
`

interface ContainerSurfaceProps {
    buttonPressed: boolean
}

export const ContainerSurface = styled.View<ContainerSurfaceProps>`
	border-radius: ${relativeScreenDensity(20)}px;
	border: ${relativeScreenDensity(2.2)}px solid ${({ theme }) => theme.colors.black[4]};
	padding-top: 5px;
	padding-bottom: 5px;
    align-items: center;
    justify-content: center;
    width: 100%;
	flex-direction: row;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.small}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.small}px;
`

export const Label = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[5]}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
    padding: ${relativeScreenHeight(0.7)}px ${relativeScreenWidth(3)}px;
    text-align: center;
`
