import React from 'react'

import PeopleWhiteIcon from '../../../assets/icons/people-white.svg'
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import BrazilWhiteIcon from '../../../assets/icons/brazil-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { ExhibitionPlaceType } from '../../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface PostRangeCardProps {
	title?: string
	postRange?: ExhibitionPlaceType
	onEdit?: () => void
}

function PostRangeCard({ title, postRange, onEdit }: PostRangeCardProps) {
	const getRelativePostRangeIcon = () => {
		switch (postRange) {
			case 'near': return PinWhiteIcon
			case 'city': return CityWhiteIcon
			case 'country': return BrazilWhiteIcon
			default: return PeopleWhiteIcon
		}
	}

	const getRelativePostRange = () => {
		switch (postRange) {
			case 'near': return showMessageWithHighlight('bairro', ['região'])
			case 'city': return showMessageWithHighlight('cidade', ['cidade'])
			case 'country': return showMessageWithHighlight('brasil', ['brasil'])
			default: return '---'
		}
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'alcance do post'}
					highlightedWords={['alcance']}
					dimensions={40}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getRelativePostRange()}
				SvgIcon={getRelativePostRangeIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { PostRangeCard }
