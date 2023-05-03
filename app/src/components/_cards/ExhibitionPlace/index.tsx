import React from 'react'

import PeopleWhiteIcon from '../../../assets/icons/people-white.svg'
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import BrazilWhiteIcon from '../../../assets/icons/brazil-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { ExhibitionPlaceType } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface ExhibitionPlaceCardProps {
	title?: string
	exhibitionPlace?: ExhibitionPlaceType
}

function ExhibitionPlaceCard({ title, exhibitionPlace }: ExhibitionPlaceCardProps) {
	const getDeliveryMethodIcon = () => {
		switch (exhibitionPlace) {
			case 'near': return PinWhiteIcon
			case 'city': return CityWhiteIcon
			case 'country': return BrazilWhiteIcon
			default: return PeopleWhiteIcon
		}
	}

	const getDeliveryMethod = () => {
		switch (exhibitionPlace) {
			case 'near': return showMessageWithHighlight('em um bairro', ['bairro'])
			case 'city': return showMessageWithHighlight('em uma cidade', ['cidade'])
			case 'country': return showMessageWithHighlight('no brasil', ['brasil'])
			default: return '---'
		}
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || 'local de atuação'}
				highlightedWords={['local', 'atuação']}
				dimensions={40}
			/>
			<PostInfoRow
				text={getDeliveryMethod()}
				SvgIcon={getDeliveryMethodIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { ExhibitionPlaceCard }
