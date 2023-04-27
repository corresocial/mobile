import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { LongText } from './styles'
import DescriptionIcon from '../../../assets/icons/description-white.svg'
import ShopIcon from '../../../assets/icons/shop.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface DescriptionCardProps {
	title?: string
	text: string
	textFontSize: number
	company?: boolean
	children?: React.ReactChild
}

function DescriptionCard({ title, text, textFontSize, company, children }: DescriptionCardProps) {
	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || 'descrição do post'}
				highlightedWords={['descrição']}
				SvgIcon={company ? ShopIcon : DescriptionIcon}
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
