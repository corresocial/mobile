import React from 'react'
import { Modal } from 'react-native'

import { TermsOfService } from '../../TermsOfService'

interface TermsOfServiceModalProps {
	visibility: boolean
	closeModal: () => void
}

function TermsOfServiceModal({ visibility, closeModal }: TermsOfServiceModalProps) {
	return (
		<Modal visible={visibility} transparent animationType={'fade'}>
			<TermsOfService onPress={closeModal} />
		</Modal>
	)
}

export { TermsOfServiceModal }
