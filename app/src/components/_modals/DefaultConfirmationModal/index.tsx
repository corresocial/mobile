import React from 'react'

import { CustomModal } from '../CustomModal'

interface DefaultConfirmationModalProps {
	visibility: boolean
	title?: string
	text?: string
	highlightedWords?: string[]
	buttonKeyword?: string
	closeModal: () => void
	onPressButton: () => void
}

function DefaultConfirmationModal({
	visibility,
	title,
	text,
	highlightedWords,
	buttonKeyword,
	closeModal,
	onPressButton
}: DefaultConfirmationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={title || ''}
			firstParagraph={{
				text: text || '',
				highlightedWords: highlightedWords || []
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: `sim${buttonKeyword ? `, ${buttonKeyword}` : ''}`,
				onPress: onPressButton
			}}
			negativeButton={{
				label: 'não, cancelar',
				onPress: closeModal
			}}
		/>
	)
}

export { DefaultConfirmationModal }
