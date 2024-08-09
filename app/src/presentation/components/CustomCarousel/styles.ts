import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const CarouselIndicatorContainer = styled.View`
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    bottom: 7%;
    width: 100%;
`

interface CarouselIndicator {
    activeIndicatorColor?: string
}

export const CarouselActiveIndicatorItem = styled.View<CarouselIndicator>`
	height: 15px;
	width: 16px;
	border-right-width: ${relativeScreenDensity(3)}px;
	border-radius: ${relativeScreenDensity(10)}px;
	border-width: ${relativeScreenDensity(1.5)}px;

    border-color: ${({ theme }) => theme.black4};
    background-color: ${({ activeIndicatorColor, theme }) => activeIndicatorColor || theme.orange3};
    margin: 0px 2px;
`

export const CarouselInactiveIndicatorItem = styled.View`
    height: 6px;
    width: 6px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.black4};
    background-color: ${({ theme }) => theme.black4};
    margin: 0px 2px;
`
