import React, { JSXElementConstructor, ReactElement } from 'react'
import { Animated } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { relativeScreenWidth } from '../../../common/screenDimensions'

import { Container, FooterTextArea } from './styles'
import { PaymentSubtitle } from '../../PaymentSubtitle'

interface DefaultHeaderContainerProps {
	children: ReactElement | ReactElement[]
	backgroundColor: string | Animated.AnimatedInterpolation<string>
	relativeHeight?: string | Animated.AnimatedInterpolation<string> | number
	centralized?: boolean
	flexDirection?: string
	justifyContent?: string
	footerText?: string | (string | ReactElement<any, string | JSXElementConstructor<any>>)[]
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
	footerText,
	backgroundColor,
	minHeight = 0,
	borderBottomWidth = 5,
	grow,
	paddingVertical,
	withoutPadding
}: DefaultHeaderContainerProps) {
	return (
		<>
			<Container
				style={{
					minHeight,
					height: grow ? 'auto' : relativeHeight,
					flexDirection,
					backgroundColor,
					borderBottomWidth: footerText ? 0 : RFValue(borderBottomWidth),
					padding: withoutPadding ? 0 : relativeScreenWidth(5),
					paddingVertical: paddingVertical ? RFValue(paddingVertical) : relativeScreenWidth(5),
					paddingBottom: footerText ? 0 : paddingVertical ? RFValue(paddingVertical) : relativeScreenWidth(5),
					alignItems: centralized ? 'center' : 'flex-start',
					justifyContent: justifyContent || (centralized ? 'center' : 'flex-start'),
				} as { [key: string]: React.CSSProperties }}
			>
				{children}
			</Container >
			{
				footerText && (
					<FooterTextArea style={{}}>
						<PaymentSubtitle text={footerText} />
					</FooterTextArea>
				)
			}
		</>
	)
}

export { DefaultHeaderContainer }
