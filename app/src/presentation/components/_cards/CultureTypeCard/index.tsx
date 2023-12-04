import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import ColorPaletWhiteIcon from '../../../assets/icons/colorPalet-white.svg'
import CalendarEverydayWhiteIcon from '../../../assets/icons/calendarEveryday-white.svg'
import BooksWhiteIcon from '../../../assets/icons/books-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { CultureType } from '../../../../services/firebase/types'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface CultureTypeCardProps {
	title?: string
	macroCategory?: CultureType
	hightligtedWords?: string[]
	onEdit?: () => void
}

function CultureTypeCard({ title, macroCategory, hightligtedWords, onEdit }: CultureTypeCardProps) {
	const getRelativeCultureType = () => {
		switch (macroCategory) {
			case 'art': return showMessageWithHighlight('postando arte', ['arte'])
			case 'event': return showMessageWithHighlight('postando evento', ['evento'])
			case 'education': return showMessageWithHighlight('postando educação', ['educação'])
			default: return showMessageWithHighlight('tipo indisponível', ['indisponível'])
		}
	}

	const getRelativeValueIcon = () => {
		switch (macroCategory) {
			case 'art': return ColorPaletWhiteIcon
			case 'event': return CalendarEverydayWhiteIcon
			case 'education': return BooksWhiteIcon
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

export { CultureTypeCard }
