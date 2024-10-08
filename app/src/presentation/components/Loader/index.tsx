import React, { useRef } from 'react'

import LottieView from 'lottie-react-native'

import { AnimationContainer, Container } from './styles'
import logoCorreFlow from '@assets/animations/logoCorreFlow-old.json'

interface LoaderProps {
	flex?: boolean
	animationScale?: number
}

function Loader({ flex, animationScale }: LoaderProps) {
	const animation = useRef<any>(null)
	return (
		<Container style={{ flex: flex ? 1 : 0 }} >
			<AnimationContainer animationScale={animationScale}>
				<LottieView
					source={logoCorreFlow}
					ref={animation}
					autoPlay
					loop
					speed={1.5}
					style={{ flex: 1, pointerEvents: 'none' }}
					resizeMode={'contain'}
				/>
			</AnimationContainer>
		</Container>
	)
}

export { Loader }
