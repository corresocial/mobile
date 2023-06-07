import React from 'react'

import { CustomModal } from '../CustomModal'

interface BeForgottenConfirmationModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function BeForgottenConfirmationModal({
	visibility,
	closeModal,
	onPressButton
}: BeForgottenConfirmationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'ser esquecido'}
			firstParagraph={{
				text: 'você tem certeza que quer ser esquecido? \nesse processo pode demorar até uma semana útil',
				highlightedWords: ['ser', 'esquecido']
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'sim, apagar',
				onPress: onPressButton
			}}
			negativeButton={{
				label: 'não, cancelar',
				onPress: closeModal
			}}
		/>
	)
}

export { BeForgottenConfirmationModal }
