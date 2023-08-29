import React from 'react'

import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'
import { Container, RightArea, RightAreaText, Title } from './styles'
import AngleRightWhitetIcon from '../../../assets/icons/angleRight-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

interface SubtitleCardProps {
	text: string
	highlightedText: string[]
	seeMoreText?: boolean
	SvgIcon?: React.FC<SvgProps>
	onPress?: () => void
}

function SubtitleCard({ text, highlightedText, seeMoreText, SvgIcon, onPress }: SubtitleCardProps) {
	return (
		<Container
			onPress={onPress && onPress}
			activeOpacity={0.7}
			hasIcon={!SvgIcon}
		>
			{SvgIcon && <SvgIcon width={'15%'} height={'120%'} />}
			<Title>{showMessageWithHighlight(text, highlightedText)}</Title>
			<RightArea>
				{seeMoreText && <RightAreaText>{showMessageWithHighlight('ver mais', ['mais'])}</RightAreaText>}
				{onPress && <AngleRightWhitetIcon width={'40%'} height={RFValue(18)} />}
			</RightArea>
		</Container>
	)
}

export { SubtitleCard }
