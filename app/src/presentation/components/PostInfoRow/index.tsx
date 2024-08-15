import React, { ReactElement } from 'react'
import { SvgProps } from 'react-native-svg'

import { Container, PostInfoText } from './styles'
import { relativeScreenDensity } from '@common/screenDimensions'

interface PostInfoRowProps {
	text: string | ReactElement | (string | ReactElement)[]
	SvgIcon?: React.FC<SvgProps> | false
	SecondSvgIcon?: React.FC<SvgProps>
	topic?: boolean
	textFontSize?: number
	withoutMarginTop?: boolean
}

function PostInfoRow({ text, topic, SvgIcon, SecondSvgIcon, withoutMarginTop, textFontSize = 14 }: PostInfoRowProps) {
	return (
		<Container withoutMarginTop={withoutMarginTop} topic={topic}>
			{SvgIcon && <SvgIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(20)} />}
			<PostInfoText
				topic={topic}
				hasSeccondSvgIcon={!!SecondSvgIcon}
				style={{ fontSize: relativeScreenDensity(textFontSize) }}
			>
				{topic ? '●  ' : ''}
				{text}
			</PostInfoText>
			{SecondSvgIcon && <SecondSvgIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(20)} />}
		</Container>
	)
}

export { PostInfoRow }
