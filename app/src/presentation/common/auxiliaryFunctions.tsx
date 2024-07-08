import React from 'react'
import { Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import uuid from 'react-uuid'

const showMessageWithHighlight = (message: string, highlightedWords?: string[], subtitleWords: string[] = []) => {
	if (!highlightedWords) return message

	const words = message.split(/ /gi)
	const commonSymbols = ['.'] // old, foram removidos a vírgula e a interrogação

	const messageHighlighted = words.map((word: string, index: number) => {
		let wordWithoutSymbols = word
		let symbolRemoved = ''
		if (commonSymbols.includes(word.substring(word.length - 1, word.length))) {
			wordWithoutSymbols = word.substring(0, word.length - 1)
			symbolRemoved = word.substring(word.length - 1, word.length)
		}

		if (highlightedWords.includes(wordWithoutSymbols as never)) {
			return (
				<Text
					style={{
						fontFamily: 'Arvo_700Bold',
					}}
					key={uuid()}
				>
					{`${wordWithoutSymbols}`}
					<Text style={{
						fontFamily: 'Arvo_400Regular',
					}}
					>
						{`${symbolRemoved} `}
					</Text>
				</Text >
			)
		}

		if (subtitleWords.length && subtitleWords.includes(wordWithoutSymbols as never)) {
			return (
				<Text style={{
					fontFamily: 'Arvo_400Regular',
					fontSize: RFValue(12)
				}}
				>
					{`${word} `}
				</Text>
			)
		}

		return `${wordWithoutSymbols}${symbolRemoved} `
	})

	return messageHighlighted
}

const filterLeavingOnlyNumbers = (dirtyText: string) => {
	if (!dirtyText.length) return ''
	const cleanText = dirtyText.match(/[0-9]/ig)?.join('') || ''
	return cleanText
}

const getShortText = (longText: string | undefined, size: number) => {
	if (!longText) return ''
	if (longText.length <= size) return longText
	return `${longText.slice(0, size)}...`
}

// Business rules vvv

function dateHasExpired( // Business rule
	startDateInMilliseconds: number,
	endDateInMilliseconds: number,
	numberOfDays: number = 1,
	returnNumberOfExpiredDays: boolean = false
) {
	if ((endDateInMilliseconds + 86400000) - startDateInMilliseconds <= 0 && !returnNumberOfExpiredDays) return true // 1 dia para efetivação do pagamento
	const diff = Math.abs(endDateInMilliseconds - startDateInMilliseconds)
	const differenceDaysInMilliseconds = (numberOfDays * 24 * 60 * 60 * 1000)

	if (returnNumberOfExpiredDays) return parseInt((diff / 1000 / 60 / 60 / 24).toFixed(0))

	if (diff <= differenceDaysInMilliseconds || (diff / 1000 / 60 / 60 / 24) >= numberOfDays) return false
	return true
}

const emailIsValid = (email?: string) => { // Business rule
	if (!email) return false
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return email.match(emailRegex)
}

export {
	showMessageWithHighlight, // string highlight
	filterLeavingOnlyNumbers, // string filter
	getShortText,
	dateHasExpired,
	emailIsValid,
}
