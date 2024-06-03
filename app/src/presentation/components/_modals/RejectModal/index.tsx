import React from 'react'

import DeniedWhiteIcon from '@assets/icons/denied-white.svg'

import { CustomModal } from '../CustomModal'

interface RejectModalProps {
	visibility: boolean
	closeModal?: () => void
}

function RejectModal({
	visibility,
	closeModal = () => { },
}: RejectModalProps) {
	return (
		<CustomModal
			overlayColor={'error'}
			visibility={visibility}
			title={'post rejeitado'}
			titleAlign={'center'}
			TitleIcon={DeniedWhiteIcon}
			firstParagraph={{
				text: 'sua alteração foi rejeitada por não estar de acordo com nossos termos de uso.',
				highlightedWords: ['rejeitada', 'não', 'estar', 'de', 'acordo', 'termos', 'uso'],
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
