import React from 'react'
import { CustomModal } from '../CustomModal'

interface SubscriptionAlertModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function SubscriptionAlertModal({ visibility, closeModal, onPressButton }: SubscriptionAlertModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'opa!'}
			firstParagraph={{
				text: 'sua assinatura foi ou será cancelada devido a problemas com o seu pagamento',
				highlightedWords: ['cancelada', 'assinatura', 'foi', 'sua', 'será', 'ou']
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'entendi',
				onPress: onPressButton
			}}
		/>
	)
}

export { SubscriptionAlertModal }
