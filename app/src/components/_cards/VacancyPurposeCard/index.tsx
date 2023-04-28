import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import SuitCaseWhiteIcon from '../../../assets/icons/suitCase-white.svg'
import PersonWithSuitCaseWhiteIcon from '../../../assets/icons/personWithSuitCase-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { VacancyPurpose } from '../../../services/firebase/types'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface VacancyPurposeCardProps {
	title?: string
	vacancyPurpose?: VacancyPurpose
	hightligtedWords?: string[]
}

function VacancyPurposeCard({ title, vacancyPurpose, hightligtedWords }: VacancyPurposeCardProps) {
	const getRelativeVacancyPurposeCard = () => {
		switch (vacancyPurpose) {
			case 'findProffessional': return showMessageWithHighlight('procurando profissional', ['profissional'])
			case 'findVacancy': return showMessageWithHighlight('procurando vaga', ['vaga'])
			default: return showMessageWithHighlight('tipo indisponível', ['indisponível'])
		}
	}

	const getRelativeValueIcon = () => {
		switch (vacancyPurpose) {
			case 'findProffessional': return SuitCaseWhiteIcon
			case 'findVacancy': return PersonWithSuitCaseWhiteIcon
			default: return PinWhiteIcon
		}
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || 'tipo de post'}
				highlightedWords={hightligtedWords || ['tipo']}
				dimensions={30}
			/>
			<PostInfoRow
				text={getRelativeVacancyPurposeCard()}
				SvgIcon={getRelativeValueIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { VacancyPurposeCard }
