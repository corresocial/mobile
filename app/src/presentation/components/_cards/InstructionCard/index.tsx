import React from 'react'
import { Linking, TouchableOpacity, ViewStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, Message, MessageTitle, RedirectLink } from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
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
				borderLeftWidth: RFValue(borderLeftWidth),
				flex,
				backgroundColor: backgroundColor || theme.white3,
				padding: RFValue(padding),
				paddingVertical: RFValue(14),
			}}
		>
			{title && <MessageTitle >{showMessageWithHighlight(title, highlightedWords)}</MessageTitle>}
			<Message
				style={{
					fontSize: fontSize ? RFValue(fontSize) : RFValue(18),
					lineHeight: lineHeight ? RFValue(lineHeight) : RFValue(22),
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
