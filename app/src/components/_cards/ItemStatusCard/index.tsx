import React from 'react'

import GiftWhiteIcon from '../../../assets/icons/gift-white.svg'
import UserLabelWhiteIcon from '../../../assets/icons/usedLabel-white.svg'
import TruckIcon from '../../../assets/icons/truck.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { ItemStatus } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface ItemStatusCardProps {
	title?: string
	itemStatus?: ItemStatus
	onEdit?: () => void
}

function ItemStatusCard({ title, itemStatus, onEdit }: ItemStatusCardProps) {
	const getRelativeItemStatusIcon = () => {
		switch (itemStatus) {
			case 'new': return GiftWhiteIcon
			case 'used': return UserLabelWhiteIcon
			default: return TruckIcon
		}
	}

	const getRelativeItemStatus = () => {
		switch (itemStatus) {
			case 'new': return showMessageWithHighlight('produto novo', ['novo'])
			case 'used': return showMessageWithHighlight('produto usado', ['usado'])
			default: return 'indefinido'
		}
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'estado do produto'}
					highlightedWords={['estado']}
					dimensions={40}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getRelativeItemStatus()}
				SvgIcon={getRelativeItemStatusIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { ItemStatusCard }
