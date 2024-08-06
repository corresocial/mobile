import React from 'react'

import { AlertModalContent } from '@contexts/AlertContext/types'

import { CustomModal } from '../CustomModal'

interface DefaultAlertModalProps {
	data?: AlertModalContent
	closeModal(): void
}

// REFACTOR Não utilizar custom modal, criar um novo

function DefaultAlertModal({ data, closeModal }: DefaultAlertModalProps) {
	return (
		<CustomModal
			visibility={!!data?.visibility}
			title={data?.title || 'Ops!'}
			titleAlign={'center'}
			firstParagraph={{
				text: data?.text,
				fontSize: 14,
				textAlign: 'center'
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'entendi',
				onPress: data?.handleSuccessMethod || closeModal,
			}}
		>

		</CustomModal>
	)
}

DefaultAlertModal.defaultProps = {
	data: {
		visibility: false,
		title: 'Ops!',
		text: 'Ocorreu um erro',
		type: 'info',
		handleSuccessMethod: () => { },
		handleAlternativeMethod: () => { },
	} as DefaultAlertModalProps['data']
}

export { DefaultAlertModal }
