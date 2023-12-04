import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import ComputerAndPhoneWhiteIcon from '../../../assets/icons/computerAndPhone-white.svg'
import HandOnPersonWhiteIcon from '../../../assets/icons/handOnPerson-white.svg'
import ShopWhiteIcon from '../../../assets/icons/shop-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { PlaceModalityType, WorkplaceType } from '../../../../services/firebase/types'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface PlaceModalityProps {
	title?: string
	placeModality?: PlaceModalityType | WorkplaceType
	hightligtedWords?: string[]
	isVacancy?: boolean
	onEdit?: () => void
}

function PlaceModality({ title, placeModality, hightligtedWords, isVacancy, onEdit }: PlaceModalityProps) {
	const getRelativePlaceModality = () => {
		const prefix = isVacancy ? 'vaga ' : ''

		switch (placeModality) {
			case 'presential': return showMessageWithHighlight(`${prefix}presencial`, ['presencial'])
			case 'online': return showMessageWithHighlight(`${prefix}online`, ['online'])
			case 'homeoffice': return showMessageWithHighlight('vaga de casa', ['de', 'casa'])
			case 'both': return showMessageWithHighlight('online e presencial', ['online', 'presencial'])
			case 'hybrid': return showMessageWithHighlight('vaga híbrida', ['híbrida'])
			default: return showMessageWithHighlight('local indisponível', ['indisponível'])
		}
	}

	const getRelativeValueIcon = () => {
		switch (placeModality) {
			case 'online': return ComputerAndPhoneWhiteIcon
			case 'presential': return isVacancy ? ShopWhiteIcon : HandOnPersonWhiteIcon
			case 'both': return ComputerAndPhoneWhiteIcon
			case 'hybrid': return ShopWhiteIcon
			case 'homeoffice': return ComputerAndPhoneWhiteIcon
			default: return PinWhiteIcon
		}
	}

	const getSecondSvgIcon = () => {
		if (placeModality === 'both') return HandOnPersonWhiteIcon
		if (placeModality === 'hybrid') return ComputerAndPhoneWhiteIcon
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'como vai ser'}
					highlightedWords={hightligtedWords || ['como']}
					dimensions={30}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getRelativePlaceModality()}
				SvgIcon={getRelativeValueIcon()}
				SecondSvgIcon={getSecondSvgIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { PlaceModality }
