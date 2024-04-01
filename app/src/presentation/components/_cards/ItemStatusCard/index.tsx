import React from 'react'

import { ItemStatus } from '@domain/post/entity/types'

import GiftWhiteIcon from '@assets/icons/gift-white.svg'
import TruckWhiteIcon from '@assets/icons/truck-white.svg'
import UserLabelWhiteIcon from '@assets/icons/usedLabel-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
// import { DefaultCardContainer } from '../DefaultCardContainer'
import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

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
			default: return TruckWhiteIcon
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
		<DefaultTouchableCardContainer
			pressionable={!!onEdit}
			onPress={onEdit}
		>
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
		</DefaultTouchableCardContainer>
	)
}

export { ItemStatusCard }
