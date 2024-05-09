import React from 'react'

import { AlertModalContent } from '@contexts/AlertContext/types'

import BellOffWhiteIcon from '@assets/icons/bell-white.svg'

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
			title={'ativar as notificações'}
			titleAlign={'center'}
			TitleIcon={BellOffWhiteIcon}
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
			negativeButton={{
				label: 'fechar',
				onPress: closeModal,
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
