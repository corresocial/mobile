import React, { ReactElement } from 'react'
import { Animated } from 'react-native'
import { screenHeight, screenWidth } from '../../common/screenDimensions'

import { Container } from './styles'

interface DefaultHeaderContainerProps {
    children: ReactElement | ReactElement[]
    backgroundColor: string | Animated.AnimatedInterpolation
    relativeHeight?: string | Animated.AnimatedInterpolation
    centralized?: boolean
    flexDirection?: string
    justifyContent?: string
    minHeight?:number
    withoutPadding?: boolean
}

function DefaultHeaderContainer({
    children,
    relativeHeight,
    centralized,
    flexDirection = 'row',
    justifyContent,
    backgroundColor,
    minHeight,
    withoutPadding }: DefaultHeaderContainerProps) {
    return (
        <Container
            style={{
                minHeight: minHeight,
                height: relativeHeight || '55%',
                alignItems: centralized ? 'center' : 'flex-start',
                justifyContent: justifyContent ? justifyContent : (centralized ? 'center' : 'flex-start'),
                flexDirection: flexDirection,
                backgroundColor: backgroundColor,
                padding: withoutPadding ? 0 : screenWidth * 0.08,
            } as { [key: string]: React.CSSProperties }}
        >
            {children}
        </Container >
    )
}

export { DefaultHeaderContainer }