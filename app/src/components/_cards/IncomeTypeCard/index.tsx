import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import SaleWhiteIcon from '../../../assets/icons/sale-white.svg'
import ServiceWhiteIcon from '../../../assets/icons/service-white.svg'
import VacancyWhiteIcon from '../../../assets/icons/vacancy-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { IncomeType } from '../../../services/firebase/types'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface IncomeTypeCardProps {
	title?: string
	macroCategory?: IncomeType
	hightligtedWords?: string[]
	onEdit?: () => void
}

function IncomeTypeCard({ title, macroCategory, hightligtedWords, onEdit }: IncomeTypeCardProps) {
	const getRelativeCultureType = () => {
		switch (macroCategory) {
			case 'sale': return showMessageWithHighlight('vendas', ['vendas'])
			case 'service': return showMessageWithHighlight('serviços', ['serviços'])
			case 'vacancy': return showMessageWithHighlight('vagas', ['vagas'])
			default: return showMessageWithHighlight('tipo indisponível', ['indisponível'])
		}
	}

	const getRelativeValueIcon = () => {
		switch (macroCategory) {
			case 'sale': return SaleWhiteIcon
			case 'service': return ServiceWhiteIcon
			case 'vacancy': return VacancyWhiteIcon
			default: return PinWhiteIcon
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
				text={getRelativeCultureType()}
				SvgIcon={getRelativeValueIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { IncomeTypeCard }
