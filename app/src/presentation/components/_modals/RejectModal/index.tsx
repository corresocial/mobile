import React from 'react'

import DeniedWhiteIcon from '@assets/icons/denied-white.svg'

import { CustomModal } from '../CustomModal'

interface RejectModalProps {
	isProfile?: boolean
	visibility: boolean
	closeModal?: () => void
}

function RejectModal({
	visibility,
	isProfile,
	closeModal = () => { },
}: RejectModalProps) {
	return (
		<CustomModal
			overlayColor={'error'}
			visibility={visibility}
			title={`${isProfile ? 'perfil' : 'post'} rejeitado`}
			titleAlign={'center'}
			TitleIcon={DeniedWhiteIcon}
			firstParagraph={{
				text: 'suas alteraçoes foram rejeitadas por não estarem de acordo com nossos termos de uso.',
				highlightedWords: ['rejeitada', 'não', 'estarem', 'de', 'acordo', 'termos', 'uso'],
				textAlign: 'center',
				fontSize: 14
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'entendi',
				onPress: closeModal
			}}
		/>
	)
}

export { RejectModal }
