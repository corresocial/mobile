import React from 'react'

import { CustomModal } from '../CustomModal'

interface VerifyUserConfirmationModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function VerifyUserConfirmationModal({
	visibility,
	closeModal,
	onPressButton
}: VerifyUserConfirmationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'verificar perfil'}
			firstParagraph={{
				text: 'você tem certeza que quer verificar esse perfil?',
				highlightedWords: ['certeza', 'verificar']
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'sim, verificar',
				onPress: onPressButton
			}}
			negativeButton={{
				label: 'não, cancelar',
				onPress: closeModal
			}}
		/>
	)
}

export { VerifyUserConfirmationModal }
