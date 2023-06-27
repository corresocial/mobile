import React from 'react'

import { CustomModal } from '../CustomModal'

interface VerifyUserConfirmationModalProps {
	visibility: boolean
	title: string
	closeModal: () => void
	onPressButton: () => void
}

function VerifyUserConfirmationModal({
	visibility,
	title,
	closeModal,
	onPressButton
}: VerifyUserConfirmationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={title}
			firstParagraph={{
				text: 'você tem certeza qaue quer verificar esse perfil?',
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
