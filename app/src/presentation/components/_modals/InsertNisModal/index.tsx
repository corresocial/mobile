import React from 'react'

import PublicServicesWhiteIcon from '@assets/icons/publicServices-white.svg'

import { CustomModal } from '../CustomModal'

interface InsertNisModalProps {
	initialInputValue: string
	visibility: boolean
	validateNis: (nis: string) => boolean
	closeModal: () => void
	onPressButton: (value?: string) => void
}

function InsertNisModal({
	initialInputValue,
	visibility,
	validateNis,
	closeModal,
	onPressButton
}: InsertNisModalProps) {
	return (
		<CustomModal
			TitleIcon={PublicServicesWhiteIcon}
			visibility={visibility}
			title={'receber mensagens sobre qual NIS?'}
			titleAlign={'center'}
			closeModal={closeModal}
			customInput={{
				placeholder: 'ex: 12345632165',
				initialValue: initialInputValue,
				keyboardType: 'numeric',
				validateText: validateNis
			}}
			firstParagraph={{
				text: 'nos informe seu NIS e fique por dentro quando seu benefício for liberado!',
				textAlign: 'center'
			}}
			affirmativeButton={{
				label: 'enviar',
				onPress: onPressButton
			}}
		/>
	)
}

export { InsertNisModal }
