import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, CountValue, IconContainer } from './styles'
import ChatEmptyWhiteIcon from '../../assets/icons/chatEmpty-white.svg'

interface UnseenMessagesCountProps {
	value: number
	width: number
	height: number
}

function UnseenMessagesCount({ value, width, height }: UnseenMessagesCountProps) {
	const getRelativeFontSize = () => {
		if (value < 99) return RFValue(15)
		if (value > 99 && value < 999) return RFValue(12)
		return RFValue(10)
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
