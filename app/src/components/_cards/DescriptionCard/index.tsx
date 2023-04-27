import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { LongText } from './styles'
import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface DescriptionCardProps {
	title?: string
	text: string
	textFontSize?: number
	children?: React.ReactChild
}

function DescriptionCard({ title, text, children, textFontSize = 14 }: DescriptionCardProps) {
	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || 'descrição do post'}
				highlightedWords={['descrição']}
				SvgIcon={DescriptionWhiteIcon}
				dimensions={30}
			/>
			<LongText style={{ fontSize: RFValue(textFontSize) }}>
				{text}
			</LongText>
			{children}
		</DefaultCardContainer>
	)
}

export { DescriptionCard }
