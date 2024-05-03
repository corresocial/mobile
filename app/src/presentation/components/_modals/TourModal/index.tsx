import React from 'react'

import { CustomModal } from '../CustomModal'

interface TourModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function TourModal({ visibility, closeModal, onPressButton }: TourModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'bem-vindo!'}
			firstParagraph={{
				text: 'para que as pessoas encontrem seu perfil, você precisa fazer sua  primeira postagem.',
				highlightedWords: ['para', 'que', 'as', 'pessoas', 'encontrem', 'seu', 'perfil,', 'primeira', 'postagem']
			}}
			secondParagraph={{
				text: 'em só 5 minutos, o seu bairro, cidade ou o país inteiro já consegue te encontrar, vamos começar?',
				highlightedWords: ['só', '5', 'minutos,', 'te', 'encontrar,']
			}}
			closeButton
			closeModal={closeModal}
			affirmativeButton={{
				label: 'vamos lá',
				onPress: onPressButton
			}}
		/>
	)
}

export { TourModal }
