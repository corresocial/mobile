import React from 'react'
import { Modal } from 'react-native'

import { Loader } from '../../Loader'

interface LoaderModalProps {
	visible: boolean
	closeModal: () => void
}

function LoaderModal({ visible, closeModal }: LoaderModalProps) {
	return (
		<Modal
			transparent
			visible={visible}
			onRequestClose={closeModal}
		>
			<Loader animationScale={120} />
		</Modal>
	)
}

export { LoaderModal }
