import React from 'react'

import { CustomModal } from '../CustomModal'
import { PostRange } from '../../../services/firebase/types'

interface RangeChangeConfirmationModalProps {
	visibility: boolean
	newRangeSelected: PostRange
	currentPostAddress: string
	closeModal: () => void
	onPressButton: () => void
}

function RangeChangeConfirmationModal({
	visibility,
	newRangeSelected,
	currentPostAddress,
	closeModal,
	onPressButton
}: RangeChangeConfirmationModalProps) {
	const getFirstParagraphText = () => {
		return newRangeSelected === 'near'
			? 'o plano região cobrirá apenas a região da localização:'
			: 'o plano cidade cobrirá apenas a localização:'
	}

	const getFirstParagraphHighlightedWords = () => {
		return newRangeSelected === 'near'
			? ['região', 'da', 'localização:']
			: ['cidade']
	}

	const getSecondParagraphText = () => {
		return newRangeSelected === 'near'
			? 'se você mudar aqui, todos seus posts fora da região serão movidos'
			: 'se você mudar aqui, todos seus posts vão mudar de cidade'
	}

	return (
		<CustomModal
			visibility={visibility}
			title={'alterar alcance'}
			firstParagraph={{
				text: getFirstParagraphText(),
				highlightedWords: getFirstParagraphHighlightedWords()
			}}
			secondParagraph={{
				text: getSecondParagraphText(),
				bolded: true
			}}
			listItemText={currentPostAddress}
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

export { RangeChangeConfirmationModal }
