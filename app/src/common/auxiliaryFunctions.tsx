import React from 'react'
import { Text } from 'react-native'
import uuid from 'react-uuid'

const showMessageWithHighlight = (message: string, highlightedWords?: string[], fontSizeHighlighted?: number) => {
	if (!highlightedWords) return message

	const words = message.split(/ /gi)

	const messageHighlighted = words.map((word: string, index: number) => {
		if (highlightedWords.includes(word as never)) {
			return (
				<Text
					style={{
						fontFamily: 'Arvo_700Bold',
						fontSize: fontSizeHighlighted
					}}
					key={uuid()}
				>
					{`${word} `}
				</Text >
			)
		}
		return `${word} `
	})

	return messageHighlighted
}

const filterLeavingOnlyNumbers = (dirtyText: string) => {
	if (!dirtyText.length) return ''
	const cleanText = dirtyText.match(/[0-9]/ig)?.join('') || ''
	return cleanText
}

export {
	showMessageWithHighlight,
	filterLeavingOnlyNumbers
}
