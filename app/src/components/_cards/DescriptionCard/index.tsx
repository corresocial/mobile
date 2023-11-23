import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import Hyperlink from 'react-native-hyperlink'

import { LongText, SeeMoreLabel } from './styles'
import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'
import { getShortText } from '../../../common/auxiliaryFunctions'
import { theme } from '../../../common/theme'

interface DescriptionCardProps {
	title?: string
	text: string
	hightligtedWords?: string[]
	textFontSize?: number
	children?: React.ReactChild
	onEdit?: () => void
}

function DescriptionCard({ title, text, hightligtedWords, children, textFontSize = 14, onEdit }: DescriptionCardProps) {
	const sumarizedSubscriptionSize = 200

	const showResizeLabel = text.length >= sumarizedSubscriptionSize

	const [escriptionIsExpanded, setDescriptionIsExpanded] = useState(false)

	const toggleDescriptionIsExpanded = () => {
		setDescriptionIsExpanded((previousState) => !previousState)
	}

	const linkStyle = {
		color: theme.orange3,
		fontFamily: 'Arvo_700Bold'
	}

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
			<Hyperlink linkDefault linkStyle={linkStyle}>
				<LongText style={{ fontSize: RFValue(textFontSize) }}>
					{escriptionIsExpanded && showResizeLabel ? text : getShortText(text, sumarizedSubscriptionSize)}
					{showResizeLabel && <SeeMoreLabel onPress={toggleDescriptionIsExpanded}>{escriptionIsExpanded ? ' mostrar menos' : 'mostrar mais'}</SeeMoreLabel>}
				</LongText>
			</Hyperlink>
			{children}
		</DefaultCardContainer>
	)
}

export { DescriptionCard }
