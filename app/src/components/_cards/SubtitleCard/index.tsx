import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { RecentPostsHeader, Title } from './styles'
import AngleRightIcon from '../../../assets/icons/angleRight-shadow.svg'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

interface SubtitleCardProps {
	text: string
	highlightedText: string[]
	onPress: () => void
}

function SubtitleCard({ text, highlightedText, onPress }: SubtitleCardProps) {
	return (
		<RecentPostsHeader onPress={onPress} activeOpacity={0.7}>
			<Title>{showMessageWithHighlight(text, highlightedText)}</Title>
			<AngleRightIcon width={RFValue(20)} height={RFValue(20)} />
		</RecentPostsHeader>
	)
}

export { SubtitleCard }
