import React from 'react'
import { CustomModal } from '../CustomModal'

interface RangePresentationModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function RangePresentationModal({ visibility, closeModal, onPressButton }: RangePresentationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'como cumprimos nossa missão'}
			firstParagraph={{
				text: 'o  corre. é um negócio social, todo nosso lucro vai para iniciativas sociais nas favelas brasileiras.',
				highlightedWords: ['corre', 'negócio', 'social']
			}}
			secondParagraph={{
				text: 'aqui você paga pelo alcance que seu perfil e posts tem, ele pode aparecer \nno seu bairro (gratuito), \nna sua cidade (pago) e \nno seu país (pago)',
				highlightedWords: ['alcance', 'bairro', 'cidade', 'país']
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'ok, entendi',
				onPress: onPressButton
			}}
		/>
	)
}

export { RangePresentationModal }
