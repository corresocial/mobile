import React from 'react'

import WirelessOffWhiteIcon from '@assets/icons/wirelessOff-white.svg'

import { CustomModal } from '../CustomModal'

interface WithoutNetworkConnectionAlertProps {
	visibility: boolean
	onPressButton: () => void
}

function WithoutNetworkConnectionAlert({
	visibility,
	onPressButton
}: WithoutNetworkConnectionAlertProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'não foi possível publicar o post'}
			TitleIcon={WirelessOffWhiteIcon}
			firstParagraph={{
				text: 'houve um erro de conexão. você pode tentar novamente ou deixar seu post agendado',
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
