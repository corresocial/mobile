import React from 'react'
import { Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import uuid from 'react-uuid'
import { formatDistance, formatRelative, isValid, format } from 'date-fns'
import brasilLocale from 'date-fns/locale/pt-BR'

import { MacroCategory, PostCollectionRemote } from '../services/firebase/types'

const arrayIsEmpty = (array: any) => {
	try {
		if (!Array.isArray(array)) return true
		if (array.length < 1) return true
		return false
	} catch (err) {
		return true
	}
}

const showMessageWithHighlight = (message: string, highlightedWords?: string[], subtitleWords: string[] = []) => {
	if (!highlightedWords) return message

	const words = message.split(/ /gi)
	const commonSymbols = [',', '.', '?']

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

const formatDate = (dateValue: Date) => {
	if (!dateValue) return ''

	const date = getNewDate(dateValue)
	if (!isValid(date)) return ''
	return format(date, 'dd/MM/yyyy', { locale: brasilLocale })
}

const formatHour = (dateValue: Date) => {
	if (!dateValue) return ''

	const date = getNewDate(dateValue)
	if (!isValid(date)) return ''
	return format(date, 'HH:mm', { locale: brasilLocale })
}

const formatRelativeDate = (daveValue: any) => {
	if (!daveValue) return ''

	const currentDate = new Date()
	const date = getNewDate(daveValue)
	if (!isValid(date)) return ''

	const distance = formatDistance(date, currentDate, { locale: brasilLocale })
	const relative = formatRelative(date, currentDate, { locale: brasilLocale })

	if (distance.match(/7\sdia?/)) {
		const hourAndMinutes = `${date.getUTCHours()}:${date.getUTCMinutes()}`
		return `${relative} às ${hourAndMinutes}`
	}
	return relative.replace('-feira', '')
}

type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number }
const getNewDate = (date: any) => {
	if (Object.keys(date).includes('seconds') || Object.keys(date).includes('_seconds')) {
		const { _seconds, seconds } = date as DateFirestore

		if (seconds) {
			return new Date(seconds * 1000)
		}
		return new Date(_seconds * 1000)
	}
	return new Date(date)
}

const sortArray = (a: string, b: string) => {
	if (a < b) return -1
	if (a > b) return 1
	return 0
}

const sortPostCategories = (a: MacroCategory, b: MacroCategory) => {
	if (a.label < b.label) return -1
	if (a.label > b.label) return 1
	return 0
}

const sortPostsByCreatedData = (a: PostCollectionRemote | any, b: PostCollectionRemote | any) => {
	if (a.createdAt < b.createdAt) return 1
	if (a.createdAt > b.createdAt) return -1
	return 0
}

export {
	arrayIsEmpty, // array validation
	showMessageWithHighlight, // string highlight
	filterLeavingOnlyNumbers, // string filter
	formatDate, // date validation
	formatHour, //  date validation
	formatRelativeDate, // date validation
	sortArray, // sort array
	sortPostCategories, // sort array
	sortPostsByCreatedData //  sort post array
}
