import React, { ReactElement } from 'react'
import { Animated } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container } from './styles'

interface DefaultHeaderContainerProps {
	children: ReactElement | ReactElement[]
	backgroundColor: string | Animated.AnimatedInterpolation
	relativeHeight?: string | Animated.AnimatedInterpolation | number
	centralized?: boolean
	flexDirection?: string
	justifyContent?: string
	minHeight?: number
	borderBottomWidth?: number
	grow?: boolean
	paddingVertical?: number
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
	grow,
	paddingVertical,
	withoutPadding
}: DefaultHeaderContainerProps) {
	return (
		<Container
			style={{
				minHeight: RFValue(minHeight),
				height: grow ? 'auto' : relativeHeight,
				flexDirection,
				backgroundColor,
				borderBottomWidth: RFValue(borderBottomWidth),
				paddingVertical: paddingVertical ? RFValue(paddingVertical) : RFValue(20),
				padding: withoutPadding ? 0 : RFValue(20),
				alignItems: centralized ? 'center' : 'flex-start',
				justifyContent: justifyContent || (centralized ? 'center' : 'flex-start'),
			} as { [key: string]: React.CSSProperties }}
		>
			{children}
		</Container >
	)
}

export { DefaultHeaderContainer }
