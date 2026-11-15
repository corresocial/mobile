import React from 'react'
import { Text } from 'react-native'
import uuid from 'react-uuid'

import { relativeScreenDensity } from '@common/screenDimensions'

import { theme } from './theme'

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
						fontFamily: theme.fonts.arvoBold
					}}
					key={uuid()}
				>
					{`${wordWithoutSymbols}`}
					<Text style={{
						fontFamily: theme.fonts.arvoRegular
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
					fontFamily: theme.fonts.arvoRegular,
					fontSize: relativeScreenDensity(12)
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

interface CodeBox {
	field: string
	set: (value: string) => void
	ref: React.RefObject<{ focus: () => void, blur: () => void } | null>
}

/**
 * Trata o texto recebido por uma das caixas do código SMS.
 * Colar o código (ou o preenchimento automático do SMS) vem com vários dígitos de uma vez:
 * eles são distribuídos pelas caixas. Digitar por cima de um dígito já preenchido o substitui.
 */
const applyCodeInputChange = (index: number, text: string, boxes: CodeBox[]) => {
	const digits = filterLeavingOnlyNumbers(text)
	const previous = boxes[index].field

	if (digits.length <= 1) {
		boxes[index].set(digits)
		return
	}

	if (digits.length === 2 && previous) {
		const typed = digits.includes(previous) ? digits.replace(previous, '') : digits.slice(-1)
		boxes[index].set(typed.slice(-1))
		return
	}

	const startAt = digits.length >= boxes.length ? 0 : index
	const chars = digits.slice(0, boxes.length - startAt).split('')
	chars.forEach((char, offset) => boxes[startAt + offset].set(char))

	const nextIndex = startAt + chars.length
	if (nextIndex >= boxes.length) boxes[boxes.length - 1].ref.current?.blur()
	else boxes[nextIndex].ref.current?.focus()
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
	applyCodeInputChange, // código SMS em várias caixas
	getShortText,
	dateHasExpired,
	emailIsValid,
}
