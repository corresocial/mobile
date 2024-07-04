import React from 'react'

import WirelessOffWhiteIcon from '@assets/icons/wirelessOff-white.svg'

import { CustomModal } from '../CustomModal'

interface WithoutNetworkConnectionAlertProps {
	title?: string
	message?: string
	highlightedWords?: string[]
	visibility: boolean
	onPressButton: () => void
}

function WithoutNetworkConnectionAlert({
	title,
	message,
	highlightedWords,
	visibility,
	onPressButton
}: WithoutNetworkConnectionAlertProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={title || 'não foi possível publicar o post'}
			TitleIcon={WirelessOffWhiteIcon}
			firstParagraph={{
				text: message || 'houve um erro de conexão. você pode tentar novamente ou deixar seu post agendado',
				highlightedWords: highlightedWords || [],
				fontSize: 16,
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

export { WithoutNetworkConnectionAlert }
