import React, { useState } from 'react'

import { Container, InnerContainer } from './styles'

interface EventCardProps{
	postData: object // temporary
	colapsed?: boolean
	onPress?: () => void
}

function EventCard({ postData, colapsed, onPress }: EventCardProps) {
	const [buttonPressed, setButtonPressed] = useState(false)

	const pressingButton = () => {
		setButtonPressed(true)
	}

	const notPressingButton = () => {
		setButtonPressed(false)
	}

	const releaseButton = () => {
		setButtonPressed(false)
		onPress?.()
	}

	return (
		<Container
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<InnerContainer buttonPressed={buttonPressed}>

			</InnerContainer>
		</Container>
	)
}

export { EventCard }
