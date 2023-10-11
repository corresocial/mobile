import React from 'react'

import WirelessOffWhiteIcon from '../../../assets/icons/wirelessOff-white.svg'

import { CustomModal } from '../CustomModal'

interface AlertNotificationModalProps {
	visibility: boolean
	onPressButton: () => void
}

function AlertNotificationModal({
	visibility,
	onPressButton
}: AlertNotificationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'ativar as notificações'}
			TitleIcon={WirelessOffWhiteIcon}
			firstParagraph={{
				text: 'com notificações, você fica sabendo sempre que alguém te manda uma mensagem. \n\nassim, você não perde nada!',
				highlightedWords: ['você', 'fica', 'sabendo', 'sempre', 'que', 'alguém', 'te', 'manda', 'uma', 'mensagem', 'você', 'não', 'perde', 'nada!'],
				fontSize: 14,
				textAlign: 'center'
			}}
			closeModal={() => { }}
			affirmativeButton={{
				label: 'ok, entendi',
				onPress: onPressButton
			}}
		/>
	)
}

export { AlertNotificationModal }
