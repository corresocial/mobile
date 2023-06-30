import React from 'react'

import { CustomModal } from '../CustomModal'
import { VerifiedLabelName } from '../../../services/firebase/types'

interface ProfileVerifiedModalProps {
	visibility: boolean;
	label?: VerifiedLabelName;
	closeModal: () => void;
}

function ProfileVerifiedModal({
	visibility,
	label,
	closeModal,
}: ProfileVerifiedModalProps) {
	const getTitle = () => {
		if (label === 'leader') {
			return 'líder social'
		}
		if (label === 'default') {
			return 'perfil verificado'
		}
		if (label === 'impact') {
			return 'perfil de impacto'
		}
	}

	const getParagraph = () => {
		if (label === 'leader') {
			return 'esse perfil pertence a um líder social do corre. nunca passe informações pessoais para ninguém!'
		}
		if (label === 'default') {
			return 'essse perfil foi verificado por nossa organização. ainda sim, nunca passe informações pessoais para ninguém!'
		}
		if (label === 'impact') {
			return 'esse perfil foi verificado por nossa organização e é um cidadão com maior necessidade de contratação, visibilidade e doações! nunca passe informações pessoais para ninguém!'
		}
	}

	return (
		<CustomModal
			visibility={visibility}
			title={getTitle()}
			firstParagraph={{
				text: getParagraph()
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'entendi!',
				onPress: closeModal,
			}}
		/>
	)
}

export { ProfileVerifiedModal }
