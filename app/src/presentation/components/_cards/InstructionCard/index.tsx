import React from 'react'
import { Linking, TouchableOpacity, ViewStyle } from 'react-native'

import { Container, Message, MessageTitle, RedirectLink } from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

interface InstructionCardProps {
	message: string
	title?: string
	highlightedWords?: string[]
	redirectLink?: string
	redirectLinkLabel?: string
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
	redirectLink,
	redirectLinkLabel,
	backgroundColor,
	padding = 15,
	fontSize,
	lineHeight,
	borderLeftWidth = 8,
	flex = 1,
	children
}: InstructionCardProps) {
	return (
		<Container
			style={{
				borderLeftWidth: relativeScreenDensity(borderLeftWidth),
				flex,
				backgroundColor: backgroundColor || theme.colors.white[3],
				padding: relativeScreenDensity(padding),
				paddingVertical: relativeScreenDensity(14),
			}}
		>
			{title && <MessageTitle >{showMessageWithHighlight(title, highlightedWords)}</MessageTitle>}
			<Message
				style={{
					fontSize: fontSize ? relativeScreenDensity(fontSize) : relativeScreenDensity(18),
					lineHeight: lineHeight ? relativeScreenDensity(lineHeight) : relativeScreenDensity(22),
				}}
			>
				{showMessageWithHighlight(message, highlightedWords)}
			</Message>
			{children}
			{redirectLink && redirectLinkLabel && (
				<TouchableOpacity onPress={() => Linking.openURL(redirectLink)}>
					<RedirectLink>{redirectLinkLabel}</RedirectLink>
				</TouchableOpacity>
			)}
		</Container>
	)
}

export { InstructionCard }
