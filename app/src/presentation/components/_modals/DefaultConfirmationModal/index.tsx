import React from 'react'

import { CustomModal } from '../CustomModal'

interface DefaultConfirmationModalProps {
	visibility: boolean
	title?: string
	text?: string
	highlightedWords?: string[]
	buttonKeyword?: string
	onPressButton: () => void
	closeModal?: () => void
	onPressNegativeButton?: () => void
}

function DefaultConfirmationModal({
	visibility,
	title,
	text,
	highlightedWords,
	buttonKeyword,
	closeModal = () => { },
	onPressNegativeButton,
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
				onPress: onPressNegativeButton || closeModal
			}}
		/>
	)
}

export { DefaultConfirmationModal }
