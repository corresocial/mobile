import React from 'react'

import { NewHomePostType } from '@domain/post/entity/types'
import { MacroCategories, MacroCategoriesType } from '@utils/postMacroCategories/types'

import { postMacroCategories } from '@utils/postMacroCategories'

import PinWhiteIcon from '@assets/icons/pin-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface MacroCategoryCardProps {
	title?: string
	postType: NewHomePostType
	macroCategory: MacroCategoriesType
	hightligtedWords?: string[]
	onEdit?: () => void
}

// [deprecated]

function MacroCategoryCard({ title, postType, macroCategory, hightligtedWords, onEdit }: MacroCategoryCardProps) {
	const getRelativeMacroCategoryCard = () => {
		try {
			const currentPostType: any = postMacroCategories[postType] as MacroCategories
			const currentMacroCategory = currentPostType[macroCategory as MacroCategoriesType]
			return currentMacroCategory.label
		} catch (err) {
			console.log(err)
			return showMessageWithHighlight('tipo indisponível', ['indisponível'])
		}
	}

	const getRelativeValueIcon = () => {
		try {
			const currentPostType: any = postMacroCategories[postType] as MacroCategories
			const currentMacroCategory = currentPostType[macroCategory as MacroCategoriesType]
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
			{
				macroCategory && (
					<PostInfoRow
						text={getRelativeMacroCategoryCard()}
						SvgIcon={getRelativeValueIcon()}
					/>
				)
			}

		</DefaultCardContainer>
	)
}

export { MacroCategoryCard }
