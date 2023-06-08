import React from 'react'

import { Container, RightArea, RightAreaText, Title } from './styles'
import AngleRightIcon from '../../../assets/icons/angleRight.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

interface SubtitleCardProps {
	text: string
	highlightedText: string[]
	seeMoreText?: boolean
	onPress?: () => void
}

function SubtitleCard({ text, highlightedText, seeMoreText, onPress }: SubtitleCardProps) {
	return (
		<Container onPress={onPress && onPress} activeOpacity={0.7}>
			<Title>{showMessageWithHighlight(text, highlightedText)}</Title>
			<RightArea>
				{seeMoreText && <RightAreaText>{showMessageWithHighlight('ver mais', ['mais'])}</RightAreaText>}
				{onPress && <AngleRightIcon width={'40%'} height={'100%'} />}
			</RightArea>
		</Container>
	)
}

export { SubtitleCard }
