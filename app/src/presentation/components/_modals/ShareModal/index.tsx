import React from 'react'

import ShareWhiteIcon from '@assets/icons/share-white.svg'

import { CustomModal } from '../CustomModal'

interface ShareModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function ShareModal({ visibility, closeModal, onPressButton }: ShareModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'pronto!'}
			firstParagraph={{
				text: 'agora outros clientes e pessoas podem te encontrar!',
				highlightedWords: ['te', 'encontrar!']
			}}
			secondParagraph={{
				text: 'que tal começar compartilhando nas redes?! para mais pessoas ainda comprarem de você!?',
				highlightedWords: ['compartilhando', 'nas', 'redes?!']
			}}
			closeModalOnPressButton={false}
			closeButton
			closeModal={closeModal}
			affirmativeButton={{
				label: 'compartilhar',
				CustomIcon: ShareWhiteIcon,
				onPress: onPressButton
			}}
		/>
	)
}

export { ShareModal }
