import React from 'react'

import { CustomModal } from '../CustomModal'
import { PostRange } from '../../../services/firebase/types'

interface RangeChangeConfirmationModalProps {
	visibility: boolean
	newRangeSelected: PostRange
	currentCity: string
	closeModal: () => void
	onPressButton: () => void
}

function RangeChangeConfirmationModal({
	visibility,
	newRangeSelected,
	currentCity = '',
	closeModal,
	onPressButton
}: RangeChangeConfirmationModalProps) {
	const getFirstParagraphText = () => {
		return newRangeSelected === 'near'
			? 'o plano região cobrirá apenas a última localização selecionada'
			: `o plano cidade cobrirá apenas a cidade${currentCity ? ` de ${currentCity}` : ''}`
	}

	const getFirstParagraphHighlightedWords = () => {
		return newRangeSelected === 'near'
			? ['região', 'última', 'localização', 'selecionada']
			: ['cidade', ...currentCity.split(' ')]
	}

	const getSecondParagraphText = () => {
		return newRangeSelected === 'near'
			? 'se você mudar aqui, todos seus posts serão movidos para a mesma localização'
			: `se você mudar aqui, todos seus posts fora${currentCity ? ` de ${currentCity}` : ' da cidade do último post'} serão movidos para a mesma`
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
