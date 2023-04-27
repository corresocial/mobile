import React from 'react'

import PeopleWhiteIcon from '../../../assets/icons/people-white.svg'
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import BrazilWhiteIcon from '../../../assets/icons/brazil-white.svg'
import TruckIcon from '../../../assets/icons/truck.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { DeliveryMethod } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface DeliveryMethodCardProps {
	title?: string
	deliveryMethod?: DeliveryMethod
	textFontSize?: number
}

function DeliveryMethodCard({ title, deliveryMethod, textFontSize = 14 }: DeliveryMethodCardProps) {
	const getDeliveryMethodIcon = () => {
		switch (deliveryMethod) {
			case 'unavailable': return PeopleWhiteIcon
			case 'near': return PinWhiteIcon
			case 'city': return CityWhiteIcon
			case 'country': return BrazilWhiteIcon
			default: return TruckIcon
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
			<DefaultHeaderTitle
				title={title || 'entrega do post'}
				highlightedWords={['entrega']}
				dimensions={40}
			/>
			<PostInfoRow
				text={getDeliveryMethod()}
				SvgIcon={getDeliveryMethodIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { DeliveryMethodCard }
