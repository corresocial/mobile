import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, Message } from './styles'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { theme } from '../../../common/theme'

interface InstructionCardProps {
	message: string
	highlightedWords?: string[]
	backgroundColor?: string
	fontSize?: number
	lineHeight?: number
	borderLeftWidth?: number
	flex?: number
	children?: React.ReactElement | never[]
}

function InstructionCard({
	message,
	highlightedWords,
	backgroundColor,
	fontSize,
	lineHeight,
	borderLeftWidth = 5,
	flex = 1,
	children
}: InstructionCardProps) {
	return (
		<Container
			style={{
				borderLeftWidth: RFValue(borderLeftWidth),
				flex,
				backgroundColor: backgroundColor || theme.white3,
				padding: RFValue(7) || RFValue(15)
			}}
		>
			<Message
				style={{
					fontSize: fontSize ? RFValue(fontSize) : RFValue(20),
					lineHeight: lineHeight ? RFValue(lineHeight) : RFValue(22),
				}}
			>
				{showMessageWithHighlight(message, highlightedWords)}
			</Message>
			{children}
		</Container>
	)
}

export { InstructionCard }
