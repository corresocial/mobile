import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import ChatWhiteIcon from '../../../assets/icons/chatTabIconInactive.svg'
import SuitCaseWhiteIcon from '../../../assets/icons/suitCase-white.svg'
import ClockNumeredWhiteIcon from '../../../assets/icons/clockNumered-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { VacancyType } from '../../../services/firebase/types'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface VacancyTypeCardProps {
	title?: string
	vacancyType?: VacancyType
	hightligtedWords?: string[]
}

function VacancyTypeCard({ title, vacancyType, hightligtedWords }: VacancyTypeCardProps) {
	const getRelativeVacancyTypeCard = () => {
		switch (vacancyType) {
			case 'beak': return showMessageWithHighlight('um bico', ['bico'])
			case 'professional': return showMessageWithHighlight('vaga profissional', ['profissional'])
			case 'temporary': return showMessageWithHighlight('vaga temporária', ['temporária'])
			default: return showMessageWithHighlight('tipo indisponível', ['indisponível'])
		}
	}

	const getRelativeValueIcon = () => {
		switch (vacancyType) {
			case 'beak': return ChatWhiteIcon
			case 'professional': return SuitCaseWhiteIcon
			case 'temporary': return ClockNumeredWhiteIcon
			default: return PinWhiteIcon
		}
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || 'tipo de vaga'}
				highlightedWords={hightligtedWords || ['tipo', 'vaga']}
				dimensions={30}
			/>
			<PostInfoRow
				text={getRelativeVacancyTypeCard()}
				SvgIcon={getRelativeValueIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { VacancyTypeCard }
