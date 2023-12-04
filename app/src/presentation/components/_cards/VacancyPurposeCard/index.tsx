import React from 'react'

import { VacancyPurpose } from '@services/firebase/types'

import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'
import PersonWithSuitCaseWhiteIcon from '../../../assets/icons/personWithSuitCase-white.svg'
import SuitCaseWhiteIcon from '../../../assets/icons/suitCase-white.svg'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface VacancyPurposeCardProps {
	title?: string
	vacancyPurpose?: boolean | VacancyPurpose
	hightligtedWords?: string[]
	onEdit?: () => void
}

function VacancyPurposeCard({ title, vacancyPurpose, hightligtedWords, onEdit }: VacancyPurposeCardProps) {
	const getRelativeVacancyPurposeCard = () => {
		switch (vacancyPurpose) {
			case 'findProffessional': return showMessageWithHighlight('procurando profissional', ['profissional'])
			case 'findVacancy': return showMessageWithHighlight('procurando vaga', ['vaga'])
			default: {
				if (vacancyPurpose) {
					return showMessageWithHighlight('procurando vaga', ['vaga'])
				}

				return showMessageWithHighlight('procurando profissional', ['profissional'])
			}
		}
	}

	const getRelativeValueIcon = () => {
		switch (vacancyPurpose) {
			case 'findProffessional': return SuitCaseWhiteIcon
			case 'findVacancy': return PersonWithSuitCaseWhiteIcon
			default: {
				if (vacancyPurpose) {
					return SuitCaseWhiteIcon
				}

				return PersonWithSuitCaseWhiteIcon
			}
		}
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'tipo de post'}
					highlightedWords={hightligtedWords || ['tipo']}
					dimensions={30}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getRelativeVacancyPurposeCard()}
				SvgIcon={getRelativeValueIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { VacancyPurposeCard }
