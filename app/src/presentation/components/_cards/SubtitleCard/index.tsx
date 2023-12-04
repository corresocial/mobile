import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { Container, RightArea, Title } from './styles'
import AngleRightWhitetIcon from '@assets/icons/angleRight-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { theme } from '@common/theme'

import { SmallButton } from '../../_buttons/SmallButton'

interface SubtitleCardProps {
	text: string
	highlightedText: string[]
	seeMoreText?: boolean
	SvgIcon?: React.FC<SvgProps>
	onPress?: () => void
}

function SubtitleCard({ text, highlightedText, seeMoreText, SvgIcon, onPress }: SubtitleCardProps) {
	return (
		<Container hasIcon={!SvgIcon}>
			{SvgIcon && <SvgIcon width={'15%'} height={RFValue(20)} />}
			<Title
				hasIcon={!SvgIcon}
			>
				{showMessageWithHighlight(text, highlightedText)}
			</Title>
			<RightArea>
				{seeMoreText && (
					<SmallButton
						height={RFValue(30)}
						label={'mais'}
						labelColor={theme.black4}
						fontSize={11}
						SvgIcon={AngleRightWhitetIcon}
						svgScale={['70%', '15%']}
						onPress={() => onPress && onPress()}
					/>
				)}
				{/* <RightAreaText>{showMessageWithHighlight('ver mais', ['mais'])}</RightAreaText> */}
				{/* {onPress && <AngleRightWhitetIcon width={'40%'} height={RFValue(18)} />} */}
			</RightArea>
		</Container>
	)
}

export { SubtitleCard }
