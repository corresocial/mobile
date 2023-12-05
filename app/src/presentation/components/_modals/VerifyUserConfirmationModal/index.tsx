import React from 'react'

import { CustomModal } from '../CustomModal'

interface VerifyUserConfirmationModalProps {
	visibility: boolean
	title: string
	subject?: string
	closeModal: () => void
	onPressButton: () => void
}

function VerifyUserConfirmationModal({
	visibility,
	title,
	subject,
	closeModal,
	onPressButton
}: VerifyUserConfirmationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={title}
			firstParagraph={{
				text: `você tem certeza que quer ${`${subject} para` || 'verificar'} esse perfil?`,
				highlightedWords: ['certeza', 'verificar', ...subject?.split(' ') || '']
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
