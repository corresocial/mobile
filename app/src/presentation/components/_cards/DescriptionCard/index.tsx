import React, { useState } from 'react'
import { SvgProps } from 'react-native-svg'

import { HyperlinkContainer, LongText, SeeMoreLabel } from './styles'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

interface DescriptionCardProps {
	title?: string
	text?: string
	hightligtedWords?: string[]
	textFontSize?: number
	children?: React.ReactChild
	CustomHeaderIcon?: React.FC<SvgProps>
	onEdit?: () => void
}

function DescriptionCard({ title, text, hightligtedWords, children, CustomHeaderIcon, textFontSize = 14, onEdit }: DescriptionCardProps) {
	const sumarizedSubscriptionSize = 200

	const showResizeLabel = (text || '').length >= sumarizedSubscriptionSize

	const [descriptionIsExpanded, setDescriptionIsExpanded] = useState(false)

	const toggleDescriptionIsExpanded = () => {
		setDescriptionIsExpanded((previousState) => !previousState)
	}

	const linkStyle = {
		color: theme.orange3,
		fontFamily: 'Arvo_700Bold'
	}

	return (
		<DefaultTouchableCardContainer
			pressionable={!!onEdit}
			onPress={onEdit}
		>
			<EditHeaderContainer
				onPress={onEdit}
			>
				<DefaultHeaderTitle
					title={title || 'descrição do post'}
					highlightedWords={hightligtedWords || ['descrição']}
					SvgIcon={CustomHeaderIcon || DescriptionWhiteIcon}
					dimensions={25}
				/>
			</EditHeaderContainer>
			{text && (
				<>
					<VerticalSpacing height={5} relativeDensity />
					<LongText style={{ fontSize: relativeScreenDensity(textFontSize) }}>
						<HyperlinkContainer
							text={descriptionIsExpanded && showResizeLabel ? text : getShortText(text, sumarizedSubscriptionSize)}
							linkStyle={linkStyle}
							fontSize={textFontSize}
						>
							{descriptionIsExpanded && showResizeLabel ? text : getShortText(text, sumarizedSubscriptionSize)}
						</HyperlinkContainer>
						{showResizeLabel && <SeeMoreLabel onPress={toggleDescriptionIsExpanded}>{descriptionIsExpanded ? ' mostrar menos' : 'mostrar mais'}</SeeMoreLabel>}
					</LongText>
				</>
			)}
			{children}
		</DefaultTouchableCardContainer>
	)
}

export { DescriptionCard }
