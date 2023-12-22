import React from 'react'

import { VerifiedLabelName } from '@services/firebase/types'

import { CustomModal } from '../CustomModal'

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
		switch (label) {
			case 'leader': return 'líder social'
			case 'default': return 'perfil verificado'
			case 'impact': return 'perfil de impacto'
			default: return ''
		}
	}

	const getParagraph = () => {
		switch (label) {
			case 'leader': return 'esse perfil pertence a um líder social do corre. nunca passe informações pessoais para ninguém!'
			case 'default': return 'esse perfil foi verificado por nossa organização. ainda sim, nunca passe informações pessoais para ninguém!'
			case 'impact': return 'esse perfil foi verificado por nossa organização e é um cidadão com maior necessidade de contratação, visibilidade e doações! nunca passe informações pessoais para ninguém!'
			default: return ''
		}
	}

	const getHighlightedWords = () => {
		switch (label) {
			case 'leader': return ['nunca', 'passe', 'informações', 'pessoais']
			case 'default': return ['nunca', 'passe', 'informações', 'pessoais']
			case 'impact': return ['nunca', 'passe', 'informações', 'pessoais']
			default: return []
		}
	}

	return (
		<CustomModal
			visibility={visibility}
			title={getTitle()}
			firstParagraph={{
				text: getParagraph(),
				highlightedWords: getHighlightedWords()
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
