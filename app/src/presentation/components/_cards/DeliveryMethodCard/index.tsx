import React from 'react'

import { DeliveryMethod } from '@services/firebase/types'

import BrazilWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import PeopleWhiteIcon from '@assets/icons/people-white.svg'
import PinWhiteIcon from '@assets/icons/pin-white.svg'
import TruckWhiteIcon from '@assets/icons/truck-white.svg'

import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface DeliveryMethodCardProps {
	title?: string
	deliveryMethod?: DeliveryMethod
	onEdit?: () => void
}

function DeliveryMethodCard({ title, deliveryMethod, onEdit }: DeliveryMethodCardProps) {
	const getDeliveryMethodIcon = () => {
		switch (deliveryMethod) {
			case 'unavailable': return PeopleWhiteIcon
			case 'near': return PinWhiteIcon
			case 'city': return CityWhiteIcon
			case 'country': return BrazilWhiteIcon
			default: return TruckWhiteIcon
		}
	}

	const getDeliveryMethod = () => {
		switch (deliveryMethod) {
			case 'unavailable': return showMessageWithHighlight('comprador busca', ['comprador', 'busca'])
			case 'near': return showMessageWithHighlight('entrego na região', ['entrego', 'região'])
			case 'city': return showMessageWithHighlight('entrego na cidade', ['entrego', 'cidade'])
			case 'country': return showMessageWithHighlight('atendo no brasil inteiro', ['atendo', 'brasil', 'inteiro'])
			default: return '---'
		}
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'entrega do post'}
					highlightedWords={['entrega']}
					dimensions={40}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getDeliveryMethod()}
				SvgIcon={getDeliveryMethodIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { DeliveryMethodCard }
