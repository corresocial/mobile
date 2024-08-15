import React from 'react'

import { Container, CountValue, IconContainer } from './styles'
import ChatEmptyWhiteIcon from '@assets/icons/chatEmpty-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

interface UnseenMessagesCountProps {
	value: number
	width: number
	height: number
}

function UnseenMessagesCount({ value, width, height }: UnseenMessagesCountProps) {
	const getRelativeFontSize = () => {
		if (value < 99) return relativeScreenDensity(15)
		if (value > 99 && value < 999) return relativeScreenDensity(12)
		return relativeScreenDensity(10)
	}

	const fontSize = getRelativeFontSize()

	if (!value) {
		return (
			<>
			</>
		)
	}

	return (
		<Container style={{ width, height }}>
			<IconContainer>
				<ChatEmptyWhiteIcon width={'100%'} height={'100%'} />
				<CountValue style={{ fontSize }}>
					{value}
				</CountValue>
			</IconContainer>

		</Container>
	)
}

export { UnseenMessagesCount }
