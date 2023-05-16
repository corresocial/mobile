import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { LongText } from './styles'
import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface DescriptionCardProps {
	title?: string
	text: string
	hightligtedWords?: string[]
	textFontSize?: number
	children?: React.ReactChild
	onEdit?: () => void
}

function DescriptionCard({ title, text, hightligtedWords, children, textFontSize = 14, onEdit }: DescriptionCardProps) {
	return (
		<DefaultCardContainer>
			<EditHeaderContainer
				onPress={onEdit}
			>
				<DefaultHeaderTitle
					title={title || 'descrição do post'}
					highlightedWords={hightligtedWords || ['descrição']}
					SvgIcon={DescriptionWhiteIcon}
					dimensions={32}
				/>
			</EditHeaderContainer>
			<LongText style={{ fontSize: RFValue(textFontSize) }}>
				{text}
			</LongText>
			{children}
		</DefaultCardContainer>
	)
}

export { DescriptionCard }
