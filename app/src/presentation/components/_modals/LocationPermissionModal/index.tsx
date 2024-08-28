import React from 'react'

import MapIcon from '@assets/icons/map.svg'
import LocationIcon from '@assets/icons/mapPoint-white.svg'

import { CustomModal } from '../CustomModal'

interface LocationPermissionModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function LocationPermissionModal({ visibility, closeModal, onPressButton }: LocationPermissionModalProps) {
	return (
		<CustomModal
			closeModal={closeModal}
			visibility={visibility}
			TitleIcon={MapIcon}
			title={'Permissão de localização'}
			firstParagraph={{
				text: 'Precisamos de sua localização para trazer os posts da sua região para você, habilite agora ou nas configurações do aplicativo!'
			}}
			affirmativeButton={{
				label: 'Ativar localização',
				onPress: onPressButton,
				CustomIcon: LocationIcon
			}}
		/>
	)
}

export { LocationPermissionModal }
