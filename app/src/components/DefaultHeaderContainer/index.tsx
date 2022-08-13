import React, { ReactElement } from 'react'
import { Animated } from 'react-native'
import { screenWidth } from '../../common/screenDimensions'

import { Container } from './styles'

interface DefaultHeaderContainerProps {
    children: ReactElement | ReactElement[]
    backgroundColor: string | Animated.AnimatedInterpolation
    relativeHeight?: string
    centralized?: boolean
    withoutPadding?: boolean
}

function DefaultHeaderContainer({
    children,
    relativeHeight,
    centralized,
    backgroundColor,
    withoutPadding }: DefaultHeaderContainerProps) {
    return (
        <Container style={{
            height: relativeHeight || '55%',
            alignItems: centralized ? 'center' : 'flex-start',
            justifyContent: centralized ? 'center' : 'flex-start',
            backgroundColor: backgroundColor as string,
            padding: withoutPadding ? 0 : screenWidth * 0.08
        }}>
            {children}
        </Container >
    )
}

export { DefaultHeaderContainer }