import React from 'react'

import { CustomModal } from '../CustomModal'
import { PostRange } from '../../../../services/firebase/types'

interface LocationChangeConfirmationModalProps {
	visibility: boolean
	newRangeSelected: PostRange
	currentPostAddress: string
	closeModal: () => void
	onPressButton: () => void
}

function LocationChangeConfirmationModal({
	visibility,
	newRangeSelected,
	currentPostAddress,
	closeModal,
	onPressButton
}: LocationChangeConfirmationModalProps) {
	const getFirstParagraphText = () => {
		return newRangeSelected === 'near'
			? 'o plano região cobre apenas a região da localização:'
			: 'o plano cidade cobre apenas a localização:'
	}

	const getFirstParagraphHighlightedWords = () => {
		return newRangeSelected === 'near'
			? ['região', 'da', 'localização:']
			: ['cidade']
	}

	const getSecondParagraphText = () => {
		return newRangeSelected === 'near'
			? 'se você mudar aqui, todos seus posts vão mudar de região'
			: 'se você mudar aqui, todos seus posts vão mudar de cidade'
	}

	return (
		<CustomModal
			visibility={visibility}
			title={'alterar localização'}
			firstParagraph={{
				text: getFirstParagraphText(),
				highlightedWords: getFirstParagraphHighlightedWords()
			}}
			listItemText={currentPostAddress}
			secondParagraph={{
				text: getSecondParagraphText(),
				bolded: true
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'sim, alterar',
				onPress: onPressButton
			}}
			negativeButton={{
				label: 'não, cancelar',
				onPress: closeModal
			}}
		/>
	)
}

export { LocationChangeConfirmationModal }
