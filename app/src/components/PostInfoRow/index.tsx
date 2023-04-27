import React, { ReactElement } from 'react'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, PostInfoText } from './styles'

interface PostInfoRowProps {
	text: string | ReactElement | (string | ReactElement)[]
	SvgIcon?: React.FC<SvgProps> | false
	SecondSvgIcon?: React.FC<SvgProps>
	textFontSize?: number
	withoutMarginTop?: boolean
}

function PostInfoRow({ text, SvgIcon, SecondSvgIcon, withoutMarginTop, textFontSize = 14 }: PostInfoRowProps) {
	return (
		<Container withoutMarginTop={withoutMarginTop}>
			{SvgIcon && <SvgIcon width={RFValue(30)} height={RFValue(20)} />}
			<PostInfoText
				hasSeccondSvgIcon={!!SecondSvgIcon}
				style={{ fontSize: RFValue(textFontSize) }}
			>
				{text}
			</PostInfoText>
			{SecondSvgIcon && <SecondSvgIcon width={RFValue(30)} height={RFValue(20)} />}
		</Container>
	)
}

export { PostInfoRow }
