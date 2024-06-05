import React from 'react'

import { CustomModal } from '../CustomModal'

interface RejectConfirmationModalProps {
	visibility: boolean
	onPressButton: (text?: string) => void
	closeModal?: () => void
	onPressNegativeButton?: () => void
}

function RejectConfirmationModal({
	visibility,
	closeModal = () => { },
	onPressNegativeButton,
	onPressButton
}: RejectConfirmationModalProps) {
	return (
		<CustomModal
			overlayColor={'error'}
			visibility={visibility}
			title={'rejeitar'}
			firstParagraph={{
				text: 'deseja escrever uma mensagem ao usuário explicando a rejeição?',
				highlightedWords: ['escrever', 'uma', 'mensagem', 'explicando', 'a', 'rejeição']
			}}
			closeModal={closeModal}
			customInput={{
				placeholder: 'mensagem',
				keyboardType: 'default',
				validateText: (text) => text.length > 5
			}}
			affirmativeButton={{
				label: 'sim, rejeitar',
				onPress: onPressButton
			}}
			negativeButton={{
				label: 'não, cancelar',
				onPress: onPressNegativeButton || closeModal
			}}
		/>
	)
}

export { RejectConfirmationModal }
