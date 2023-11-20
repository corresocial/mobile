import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import PinWhiteIcon from '../../../assets/icons/pin-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { NewHomePostType } from '../../../services/firebase/types'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'
import { postMacroCategories } from '../../../utils/postMacroCategories'
import { MacroCategories, MacroCategoriesType } from '../../../utils/postMacroCategories/types'

interface MacroCategoryCardProps {
	title?: string
	postType: NewHomePostType
	macroCategory: MacroCategoriesType
	hightligtedWords?: string[]
	onEdit?: () => void
}

function MacroCategoryCard({ title, postType, macroCategory, hightligtedWords, onEdit }: MacroCategoryCardProps) {
	const getRelativeMacroCategoryCard = () => {
		try {
			const currentPostType = postMacroCategories[postType] as MacroCategories
			const currentMacroCategory = currentPostType[macroCategory]
			return currentMacroCategory.label
		} catch (err) {
			console.log(err)
			return showMessageWithHighlight('tipo indisponível', ['indisponível'])
		}
		/* switch (macroCategory) {
			case 'sale': return showMessageWithHighlight('vendas', ['vendas'])
			case 'service': return showMessageWithHighlight('um serviço', ['serviço'])
			case 'vacancy': return showMessageWithHighlight('vaga temporária', ['temporária'])
			case 'event': return showMessageWithHighlight('um bico', ['bico'])
			case 'informative': return showMessageWithHighlight('um profissional', ['profissional'])
			case 'iniciative': return showMessageWithHighlight('vaga temporária', ['temporária'])
			case 'art': return showMessageWithHighlight('um bico', ['bico'])
			case 'donation': return showMessageWithHighlight('um profissional', ['profissional'])
			case 'education': return showMessageWithHighlight('vaga temporária', ['temporária'])
			default: return showMessageWithHighlight('tipo indisponível', ['indisponível'])
		} */
	}

	const getRelativeValueIcon = () => {
		try {
			const currentPostType = postMacroCategories[postType] as MacroCategories
			const currentMacroCategory = currentPostType[macroCategory]
			return currentMacroCategory.SvgIcon
		} catch (err) {
			console.log(err)
			return PinWhiteIcon
		}
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'tipo de vaga'}
					highlightedWords={hightligtedWords || ['tipo', 'vaga']}
					dimensions={30}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getRelativeMacroCategoryCard()}
				SvgIcon={getRelativeValueIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { MacroCategoryCard }
