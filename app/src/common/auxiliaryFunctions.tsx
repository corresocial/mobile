import React from 'react'
import { Text } from 'react-native'
import uuid from 'react-uuid'
import { formatDistance, formatRelative, isValid, format } from 'date-fns'
import brasilLocale from 'date-fns/locale/pt-BR'

const showMessageWithHighlight = (message: string, highlightedWords?: string[], fontSizeHighlighted?: number) => {
	if (!highlightedWords) return message

	const words = message.split(/ /gi)
	const commonSymbols = [',', '.']

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
						fontSize: fontSizeHighlighted
					}}
					key={uuid()}
				>
					{`${wordWithoutSymbols}`}
					<Text style={{
						fontFamily: 'Arvo_400Regular',
						fontSize: fontSizeHighlighted
					}}
					>
						{`${symbolRemoved} `}
					</Text>
				</Text >
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

const formatDate = (date: Date) => {
	if (!date) return '---'
	if (Object.keys(date).includes('seconds')) {
		const { seconds } = date as any // TODO Type
		const dateObject = new Date(seconds * 1000)
		if (!isValid(new Date(dateObject))) return '---'
		return format(dateObject, 'HH:mm')
	}
	return '---'
}

const formatRelativeDate = (initialDate: Date | string | number) => {
	if (!isValid(new Date(initialDate))) return '---'

	const date = new Date(initialDate)
	const currentDate = new Date()

	const distance = formatDistance(date, currentDate, { locale: brasilLocale })
	const relative = formatRelative(date, currentDate, { locale: brasilLocale })

	if (distance.match(/7\sdia?/)) {
		const hourAndMinutes = `${date.getUTCHours()}:${date.getUTCMinutes()}`
		return `${relative} às ${hourAndMinutes}`
	}
	return relative
}

export {
	showMessageWithHighlight,
	filterLeavingOnlyNumbers,
	formatDate,
	formatRelativeDate
}
