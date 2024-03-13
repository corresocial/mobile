import React from 'react'

import BellOffWhiteIcon from '@assets/icons/bell-white.svg'
import GearWhiteIcon from '@assets/icons/gear-white.svg'

import { CustomModal } from '../CustomModal'

interface AlertNotificationModalProps {
	visibility: boolean
	affirmativeConfigButton?: boolean
	customAlertText?: string
	customAlertTextHighlighted?: string[]
	closeModal: () => void
	onCloseModal?: () => void
	onPressButton: () => void
}

function AlertNotificationModal({
	visibility,
	affirmativeConfigButton,
	customAlertText,
	customAlertTextHighlighted,
	closeModal,
	onCloseModal,
	onPressButton
}: AlertNotificationModalProps) {
	const goToConfigButtonStyle = {
		label: 'ir para \nconfigurações',
		CustomIcon: GearWhiteIcon,
		onPress: onPressButton
	}

	return (
		<CustomModal
			visibility={visibility}
			title={'ativar as notificações'}
			titleAlign={'center'}
			TitleIcon={BellOffWhiteIcon}
			firstParagraph={{
				text: customAlertText || 'com notificações, você fica sabendo sempre que alguém te manda uma mensagem. \n\nassim, você não perde nada!',
				highlightedWords: customAlertTextHighlighted || ['você', 'fica', 'sabendo', 'sempre', 'que', 'alguém', 'te', 'manda', 'uma', 'mensagem', 'você', 'não', 'perde', 'nada!'],
				fontSize: 14,
				textAlign: 'center'
			}}
			closeModal={closeModal}
			affirmativeButton={affirmativeConfigButton
				? goToConfigButtonStyle
				: {
					label: 'ok, entendi',
					onPress: onPressButton,
				}}
			negativeButton={onCloseModal && {
				label: 'fechar',
				onPress: onCloseModal
			}}
		>

		</CustomModal>
	)
}

export { AlertNotificationModal }
