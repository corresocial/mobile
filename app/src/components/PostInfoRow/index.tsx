import React, { ReactElement } from 'react'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, PostInfoText } from './styles'

interface PostInfoRowProps {
	text: string | ReactElement | (string | ReactElement)[]
	SvgIcon?: React.FC<SvgProps>
	textFontSize?: number
	withoutMarginTop?: boolean
}

function PostInfoRow({ text, SvgIcon, withoutMarginTop, textFontSize = 14 }: PostInfoRowProps) {
	return (
		<Container withoutMarginTop={withoutMarginTop}>
			{SvgIcon && <SvgIcon width={RFValue(30)} height={RFValue(20)} />}
			<PostInfoText style={{ fontSize: RFValue(textFontSize) }}>
				{text}
			</PostInfoText>
		</Container>
	)
}

export { PostInfoRow }
