import React, { ReactElement } from 'react'
import { Animated } from 'react-native'

import { Container } from './styles'
import { RFValue } from 'react-native-responsive-fontsize'

interface DefaultHeaderContainerProps {
    children: ReactElement | ReactElement[]
    backgroundColor: string | Animated.AnimatedInterpolation
    relativeHeight?: string | Animated.AnimatedInterpolation
    centralized?: boolean
    flexDirection?: string
    justifyContent?: string
    minHeight?: number
    borderBottomWidth?: number
    withoutPadding?: boolean
}

function DefaultHeaderContainer({
    children,
    relativeHeight = '55%',
    centralized,
    flexDirection = 'row',
    justifyContent,
    backgroundColor,
    minHeight = 0,
    borderBottomWidth = 5,
    withoutPadding }: DefaultHeaderContainerProps) {
    return (
        <Container
            style={{
                minHeight: RFValue(minHeight),
                height: relativeHeight,
                flexDirection: flexDirection,
                backgroundColor: backgroundColor,
                borderBottomWidth: RFValue(borderBottomWidth),
                padding: withoutPadding ? 0 : RFValue(20),
                alignItems: centralized ? 'center' : 'flex-start',
                justifyContent: justifyContent ? justifyContent : (centralized ? 'center' : 'flex-start'),
            } as { [key: string]: React.CSSProperties }}
        >
            {children}
        </Container >
    )
}

export { DefaultHeaderContainer }