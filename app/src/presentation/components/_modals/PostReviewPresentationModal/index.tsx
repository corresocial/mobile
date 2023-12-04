import React from 'react'

import EditWhiteIcon from '../../../assets/icons/edit-white.svg'

import { CustomModal } from '../CustomModal'

interface PostReviewPresentationModalProps {
	visibility: boolean
	onPressButton: () => void
}

function PostReviewPresentationModal({
	visibility,
	onPressButton
}: PostReviewPresentationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'tela de revisão'}
			TitleIcon={EditWhiteIcon}
			firstParagraph={{
				text: 'Aqui você pode checar e modificar todas as informações do seu post, adicionar o que faltou, ou remover o que quiser.',
				highlightedWords: ['checar', 'modificar', 'adicionar', 'o', 'que', 'faltou', 'remover', 'o', 'que', 'quiser'],
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

export { PostReviewPresentationModal }
