import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const ContainerBottom = styled.View`
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(20)}px;

`

interface ContainerSurfaceProps {
	buttonPressed: boolean
}

export const ContainerSurface = styled.View<ContainerSurfaceProps>`
    border: ${relativeScreenDensity(2)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(20)}px;
    align-items: center;
    justify-content: center;
	padding: ${relativeScreenDensity(1)}px ${relativeScreenDensity(12)}px;
    height: 100%;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.small}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.small}px;
`

export const Label = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes[3]}px;
	${({ theme }) => theme.fonts.arvoBold};
    text-align: center;
`
