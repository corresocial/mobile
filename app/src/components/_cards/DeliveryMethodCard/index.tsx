import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { DeliveryMethodText } from './styles'
import TruckIcon from '../../../assets/icons/truck.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { DeliveryMethod } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface DeliveryMethodCardProps {
	title: string
	deliveryMethod?: DeliveryMethod
	textFontSize?: number
}

function DeliveryMethodCard({ title, deliveryMethod, textFontSize = 12 }: DeliveryMethodCardProps) {
	const renderDeliveryMethod = () => {
		switch (deliveryMethod) {
			case 'unavailable': return showMessageWithHighlight('não entrega', ['não'])
			case 'near': return showMessageWithHighlight('entrega perto', ['perto'])
			case 'city': return showMessageWithHighlight('entrega na cidade', ['cidade'])
			case 'country': return showMessageWithHighlight('entrega no país inteiro', ['país', 'inteiro'])
			default: return '---'
		}
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title}
				SvgIcon={TruckIcon}
				dimensions={40}
			/>

			<DeliveryMethodText style={{ fontSize: RFValue(textFontSize) }}>
				{renderDeliveryMethod()}
			</DeliveryMethodText>
		</DefaultCardContainer>
	)
}

export { DeliveryMethodCard }
