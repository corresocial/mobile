import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const CarouselIndicatorContainer = styled.View`
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    bottom: 10%;
    width: 100%;
`

interface CarouseIndicatorItemProps {
    indicatorColor?: string
}

export const CarouselActiveIndicatorItem = styled.View<CarouseIndicatorItemProps>`
    height: 15px;
    width: 16px;
    border-right-width: ${relativeScreenDensity(3)}px;
    border-radius: ${relativeScreenDensity(10)}px;
    border-width: ${relativeScreenDensity(1.5)}px;

    border-color: ${({ theme }) => theme.black4};
    background-color: ${({ theme, indicatorColor }) => indicatorColor || theme.orange3};
    margin: 0px 2px;
`

export const CarouselInactiveIndicatorItem = styled.View<CarouseIndicatorItemProps>`
    height: 9px;
    width: 9px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.black4};
	background-color: ${({ theme, indicatorColor }) => indicatorColor || theme.orange3};
    margin: 0px 2px;
`

export const FullScreenIconContainer = styled.View`
    position: absolute;
    top: ${relativeScreenDensity(15)}px;
	right: ${relativeScreenDensity(15)}px;
    z-index: 1;
`
