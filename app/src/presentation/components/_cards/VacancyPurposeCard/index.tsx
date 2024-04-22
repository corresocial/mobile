import React from 'react'

import { VacancyPurpose } from '@domain/post/entity/types'

import PersonWithSuitCaseWhiteIcon from '@assets/icons/personWithSuitCase-white.svg'
import SuitCaseWhiteIcon from '@assets/icons/suitCase-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
// import { DefaultCardContainer } from '../DefaultCardContainer'
import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

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
		<DefaultTouchableCardContainer
			pressionable={!!onEdit}
			onPress={onEdit}
		>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'propósito da vaga'}
					highlightedWords={hightligtedWords || ['propósito']}
					dimensions={30}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getRelativeVacancyPurposeCard()}
				SvgIcon={getRelativeValueIcon()}
			/>
		</DefaultTouchableCardContainer>
	)
}

export { VacancyPurposeCard }
