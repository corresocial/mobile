import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, Message } from './styles'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

interface InstructionCardProps {
	message: string
	highlightedWords?: string[]
	fontSize?: number
	fontSizeHighlighted?: number
	lineHeight?: number
	borderLeftWidth?: number
	flex?: number
	children?: React.ReactElement | never[]
}

function InstructionCard({
	message,
	highlightedWords,
	fontSize,
	fontSizeHighlighted,
	lineHeight,
	borderLeftWidth = 5,
	flex = 1,
	children
}: InstructionCardProps) {
	return (
		<Container
			style={{
				borderLeftWidth: RFValue(borderLeftWidth),
				flex
			}}
		>
			<Message
				style={{
					fontSize: fontSize ? RFValue(fontSize) : RFValue(20),
					lineHeight: lineHeight ? RFValue(lineHeight) : RFValue(22),
				}}
			>
				{showMessageWithHighlight(message, highlightedWords, fontSizeHighlighted)}
			</Message>
			{children}
		</Container>
	)
}

export { InstructionCard }
