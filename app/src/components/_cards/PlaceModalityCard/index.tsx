import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import ComputerAndPhoneWhiteIcon from '../../../assets/icons/computerAndPhone-white.svg'
import HandOnPersonWhiteIcon from '../../../assets/icons/handOnPerson-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { PlaceModalityType, WorkplaceType } from '../../../services/firebase/types'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface PlaceModalityProps {
	title?: string
	placeModality?: PlaceModalityType | WorkplaceType
	hightligtedWords?: string[]
}

function PlaceModality({ title, placeModality, hightligtedWords }: PlaceModalityProps) {
	const getRelativePlaceModality = () => {
		switch (placeModality) {
			case 'online': return showMessageWithHighlight('online', ['online'])
			case 'presential': return showMessageWithHighlight('presencial', ['presencial'])
			case 'both': return showMessageWithHighlight('online e presencial', ['online', 'presencial'])
			default: return showMessageWithHighlight('modalidade do local indiponível', ['indiponível'])
		}
	}

	const getRelativeValueIcon = () => {
		switch (placeModality) {
			case 'online': return ComputerAndPhoneWhiteIcon
			case 'presential': return HandOnPersonWhiteIcon
			case 'both': return ComputerAndPhoneWhiteIcon
			default: return PinWhiteIcon
		}
	}

	const getSecondSvgIcon = () => {
		if (placeModality === 'both') return HandOnPersonWhiteIcon
		if (placeModality === 'hybrid') return PinWhiteIcon
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || 'como vai ser'}
				highlightedWords={hightligtedWords || ['como']}
				dimensions={30}
			/>
			<PostInfoRow
				text={getRelativePlaceModality()}
				SvgIcon={getRelativeValueIcon()}
				SecondSvgIcon={getSecondSvgIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { PlaceModality }
