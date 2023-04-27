import React from 'react'

import GiftWhiteIcon from '../../../assets/icons/gift-white.svg'
import UserLabelWhiteIcon from '../../../assets/icons/usedLabel-white.svg'
import TruckIcon from '../../../assets/icons/truck.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { ItemStatus } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface ItemStatusCardProps {
	title?: string
	itemStatus?: ItemStatus
	textFontSize?: number
}

function ItemStatusCard({ title, itemStatus, textFontSize = 14 }: ItemStatusCardProps) {
	const getDeliveryMethodIcon = () => {
		switch (itemStatus) {
			case 'new': return GiftWhiteIcon
			case 'used': return UserLabelWhiteIcon
			default: return TruckIcon
		}
	}

	const getDeliveryMethod = () => {
		switch (itemStatus) {
			case 'new': return showMessageWithHighlight('produto novo', ['novo'])
			case 'used': return showMessageWithHighlight('produto usado', ['usado'])
			default: return ''
		}
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || 'estado do produto'}
				highlightedWords={['estado']}
				dimensions={40}
			/>
			<PostInfoRow
				text={getDeliveryMethod()}
				SvgIcon={getDeliveryMethodIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { ItemStatusCard }
