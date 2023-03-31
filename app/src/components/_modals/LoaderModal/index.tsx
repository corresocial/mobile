import React, { useRef } from 'react'
import { Modal } from 'react-native'
import LottieView from 'lottie-react-native'

import buildingColorPassingDark from '@assets/animations/buildingColorPassingLight.json'
import { AnimationContainer, Container } from './styles'

interface LoaderModalProps {
	visible: boolean;
	closeModal: () => void;
}

function LoaderModal({ visible, closeModal }: LoaderModalProps) {
	const animation = useRef<any>(null)

	return (
		<Modal transparent visible={visible} onRequestClose={closeModal}>
			<Container>
				<AnimationContainer>
					<LottieView
						source={buildingColorPassingDark}
						ref={animation}
						autoPlay
						loop
						speed={1.5}
					/>
				</AnimationContainer>
			</Container>
		</Modal>
	)
}

export { LoaderModal }
