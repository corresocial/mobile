import React from 'react'

import { CustomModal } from '../CustomModal'

interface InsertUserEmailModalProps {
	initialInputValue: string
	visibility: boolean
	closeModal: () => void
	onPressButton: (value?: string) => void
}

function InsertUserEmailModal({
	initialInputValue,
	visibility,
	closeModal,
	onPressButton
}: InsertUserEmailModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'qual é o seu email?'}
			closeButton
			closeModal={closeModal}
			customInput={{ placeholder: 'seuemail@email.com', initialValue: initialInputValue }}
			affirmativeButton={{
				label: 'enviar',
				onPress: onPressButton
			}}
		/>
	)
}

export { InsertUserEmailModal }
