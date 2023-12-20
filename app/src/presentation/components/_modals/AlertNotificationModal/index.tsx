import React from 'react'

import BellOffWhiteIcon from '@assets/icons/bell-white.svg'

import { CustomModal } from '../CustomModal'

interface AlertNotificationModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function AlertNotificationModal({ visibility, closeModal, onPressButton }: AlertNotificationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'ativar as notificações'}
			TitleIcon={BellOffWhiteIcon}
			firstParagraph={{
				text: 'com notificações, você fica sabendo sempre que alguém te manda uma mensagem. \n\nassim, você não perde nada!',
				highlightedWords: ['você', 'fica', 'sabendo', 'sempre', 'que', 'alguém', 'te', 'manda', 'uma', 'mensagem', 'você', 'não', 'perde', 'nada!'],
				fontSize: 14,
				textAlign: 'center'
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'ok, entendi',
				onPress: onPressButton
			}}
		>

		</CustomModal>
	)
}

export { AlertNotificationModal }
