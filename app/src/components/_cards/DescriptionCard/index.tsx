import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { LongText } from './styles'
import DescriptionIcon from '../../../assets/icons/description.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface DescriptionCardProps {
	title: string
	text: string
	textFontSize: number
}

function DescriptionCard({ title, text, textFontSize }: DescriptionCardProps) {
	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title}
				SvgIcon={DescriptionIcon}
				dimensions={35}
			/>
			<LongText style={{ fontSize: RFValue(textFontSize) }}>
				{text}
			</LongText>
		</DefaultCardContainer>
	)
}

export { DescriptionCard }
