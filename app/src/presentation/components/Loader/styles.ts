import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface LoaderProps {
    animationScale?: number
}

export const Container = styled.View`
    align-items: center;
    justify-content: center;
`

export const AnimationContainer = styled.View<LoaderProps>`
    width: ${({ animationScale }) => relativeScreenDensity(animationScale || 85)}px;
    height: ${({ animationScale }) => relativeScreenDensity(animationScale || 85)}px;
`
