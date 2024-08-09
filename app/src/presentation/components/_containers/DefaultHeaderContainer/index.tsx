import React, { JSXElementConstructor, ReactElement } from 'react'
import { Animated, ViewStyle } from 'react-native'

import { Container, FooterTextArea } from './styles'
import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { SmallInstructionCard } from '../../SmallInstructionCard'

interface DefaultHeaderContainerProps {
	children: ReactElement | ReactElement[]
	backgroundColor: string | Animated.AnimatedInterpolation<string>
	relativeHeight?: string | Animated.AnimatedInterpolation<string> | number
	centralized?: boolean
	flexDirection?: ViewStyle['flexDirection']
	justifyContent?: ViewStyle['justifyContent']
	footerText?: string | (string | ReactElement<any, string | JSXElementConstructor<any>>)[] | React.ReactNode
	footerTextHighlighted?: string | (string | ReactElement<any, string | JSXElementConstructor<any>>)[]
	minHeight?: number
	borderBottomWidth?: number
	withoutIOSPadding?: boolean
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
	footerTextHighlighted,
	backgroundColor,
	minHeight = 0,
	borderBottomWidth = 5,
	withoutIOSPadding,
	grow,
	paddingVertical,
	withoutPadding
}: DefaultHeaderContainerProps) {
	return (
		<>
			<Container
				withoutIOSPadding={withoutIOSPadding}
				style={{
					minHeight,
					height: grow ? 'auto' : relativeHeight,
					flexDirection,
					backgroundColor,
					borderBottomWidth: footerText ? 0 : relativeScreenDensity(borderBottomWidth),
					padding: withoutPadding ? 0 : relativeScreenWidth(5),
					paddingVertical: paddingVertical ? relativeScreenDensity(paddingVertical) : relativeScreenWidth(5),
					paddingBottom: footerText ? 0 : paddingVertical ? relativeScreenDensity(paddingVertical) : relativeScreenWidth(5),
					alignItems: centralized ? 'center' : 'flex-start',
					justifyContent: justifyContent || (centralized ? 'center' : 'flex-start'),
				}}
			>
				{children}
			</Container >
			{
				footerText && (
					<FooterTextArea style={{ borderBottomWidth: !FooterTextArea ? 0 : relativeScreenDensity(borderBottomWidth) }}>
						<SmallInstructionCard text={footerText} />
						{
							footerTextHighlighted && (
								<>
									<VerticalSpacing />
									<SmallInstructionCard text={footerTextHighlighted} highlight />
								</>
							)
						}
					</FooterTextArea>
				)
			}

		</>
	)
}

export { DefaultHeaderContainer }
