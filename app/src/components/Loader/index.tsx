import React, { useRef } from 'react'
import LottieView from 'lottie-react-native'

import { AnimationContainer, Container } from './styles'

import buildingColorPassingDark from '../../assets/animations/buildingColorPassingLight.json'

interface LoaderProps {
	flex?: boolean
	animationScale?: number
}

function Loader({ flex, animationScale }: LoaderProps) {
	const animation = useRef<any>(null)

	return (
		<Container style={{ flex: flex ? 1 : 0 }}>
			<AnimationContainer animationScale={animationScale}>
				<LottieView
					source={buildingColorPassingDark}
					ref={animation}
					autoPlay
					loop
					speed={1.5}
				/>
			</AnimationContainer>
		</Container>
	)
}

export { Loader }
