import React from 'react'

import { Container, Title } from './styles'
import AngleRightIcon from '../../../assets/icons/angleRight.svg'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

interface SubtitleCardProps {
	text: string
	highlightedText: string[]
	onPress?: () => void
}

function SubtitleCard({ text, highlightedText, onPress }: SubtitleCardProps) {
	return (
		<Container onPress={onPress && onPress} activeOpacity={0.7}>
			<Title>{showMessageWithHighlight(text, highlightedText)}</Title>
			{onPress && <AngleRightIcon width={'6%'} height={'100%'} />}
		</Container>
	)
}

export { SubtitleCard }
