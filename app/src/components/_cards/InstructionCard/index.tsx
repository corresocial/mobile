import React from 'react'
import { ViewStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, Message, MessageTitle } from './styles'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { theme } from '../../../common/theme'

interface InstructionCardProps {
	message: string
	title?: string
	highlightedWords?: string[]
	backgroundColor?: string
	padding?: number
	fontSize?: number
	lineHeight?: number
	borderLeftWidth?: number
	flex?: ViewStyle['flex']
	children?: React.ReactElement | React.ReactElement[] | never | never[]
}

function InstructionCard({
	message,
	title,
	highlightedWords,
	backgroundColor,
	padding = 15,
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
				padding: RFValue(padding)
			}}
		>
			{title && <MessageTitle>{showMessageWithHighlight(title, highlightedWords)}</MessageTitle>}
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
