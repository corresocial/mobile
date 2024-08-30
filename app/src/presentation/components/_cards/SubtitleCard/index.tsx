import React from 'react'
import { SvgProps } from 'react-native-svg'

import { Container, RightArea, Title } from './styles'
import AngleRightWhitetIcon from '@assets/icons/angleRight-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'

interface SubtitleCardProps {
	text: string
	highlightedText: string[]
	seeMoreText?: boolean
	fontSize?: number
	backgroundColor?: string
	SvgIcon?: React.FC<SvgProps>
	onPress?: () => void
}

function SubtitleCard({ text, fontSize, highlightedText, backgroundColor, seeMoreText, SvgIcon, onPress }: SubtitleCardProps) {
	return (
		<Container
			hasIcon={!SvgIcon}
			backgroundColor={backgroundColor}
		>
			{SvgIcon && <SvgIcon width={'15%'} height={relativeScreenDensity(20)} />}
			<Title
				hasIcon={!SvgIcon}
				fontSize={fontSize}
			>
				{showMessageWithHighlight(text, highlightedText)}
			</Title>
			{seeMoreText && (
				<RightArea>
					<SmallButton
						height={relativeScreenDensity(30)}
						label={'mais'}
						labelColor={theme.colors.black[4]}
						fontSize={11}
						SvgIcon={AngleRightWhitetIcon}
						svgScale={['70%', '15%']}
						onPress={() => onPress && onPress()}
					/>
					{/* <RightAreaText>{showMessageWithHighlight('ver mais', ['mais'])}</RightAreaText> */}
					{/* {onPress && <AngleRightWhitetIcon width={'40%'} height={relativeScreenDensity(18)} />} */}
				</RightArea>
			)}
		</Container>
	)
}

export { SubtitleCard }
