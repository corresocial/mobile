import React from 'react'

import { ExhibitionPlaceType } from '@services/firebase/types'

import BrazilWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import PeopleWhiteIcon from '@assets/icons/people-white.svg'
import PinWhiteIcon from '@assets/icons/pin-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
// import { DefaultCardContainer } from '../DefaultCardContainer'
import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

interface ExhibitionPlaceCardProps {
	title?: string
	exhibitionPlace?: ExhibitionPlaceType
	onEdit?: () => void
}

function ExhibitionPlaceCard({ title, exhibitionPlace, onEdit }: ExhibitionPlaceCardProps) {
	const getExhibitionPlaceIcon = () => {
		switch (exhibitionPlace) {
			case 'near': return PinWhiteIcon
			case 'city': return CityWhiteIcon
			case 'country': return BrazilWhiteIcon
			default: return PeopleWhiteIcon
		}
	}

	const getExhibitionPlace = () => {
		switch (exhibitionPlace) {
			case 'near': return showMessageWithHighlight('em um bairro', ['bairro'])
			case 'city': return showMessageWithHighlight('em uma cidade', ['cidade'])
			case 'country': return showMessageWithHighlight('no brasil', ['brasil'])
			default: return '---'
		}
	}

	return (
		<DefaultTouchableCardContainer
			pressionable={!!onEdit}
			onPress={onEdit}
		>

			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'local de atuação'}
					highlightedWords={['local', 'atuação']}
					dimensions={40}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getExhibitionPlace()}
				SvgIcon={getExhibitionPlaceIcon()}
			/>
		</DefaultTouchableCardContainer>
	)
}

export { ExhibitionPlaceCard }
