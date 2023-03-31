import React from 'react'

import AngleRightIcon from '@assets/icons/angleRight-shadow.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { Container, Title } from './styles'

interface SubtitleCardProps {
	text: string;
	highlightedText: string[];
	onPress: () => void;
}

function SubtitleCard({ text, highlightedText, onPress }: SubtitleCardProps) {
	return (
		<Container onPress={onPress} activeOpacity={0.7}>
			<Title>{showMessageWithHighlight(text, highlightedText)}</Title>
			<AngleRightIcon width={'6%'} height={'100%'} />
		</Container>
	)
}

export { SubtitleCard }
