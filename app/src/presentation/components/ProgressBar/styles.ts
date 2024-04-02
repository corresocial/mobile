import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    width: 100%;
    margin-top: ${relativeScreenHeight(2)}px;
`

export const IndicatorBarBottom = styled.View`
    background-color: ${({ theme }) => theme.white3};
    width: 100%;
    height: ${relativeScreenHeight(1.3)}px;
    border: ${relativeScreenWidth(0.7)}px solid ${({ theme }) => theme.black4};
    border-right-width: ${relativeScreenWidth(3)}px;
    overflow: hidden;
	border-radius: 100px;
`

export const IndicatorBarSurface = styled.View`
	border-radius: 100px;
    background-color: ${({ theme }) => theme.orange3};
    height: 105%;
`
