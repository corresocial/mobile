import React from 'react'

import { CultureType } from '@services/firebase/types'

import BooksWhiteIcon from '@assets/icons/books-white.svg'
import CalendarEverydayWhiteIcon from '@assets/icons/calendarEveryday-white.svg'
import ColorPaletWhiteIcon from '@assets/icons/colorPalet-white.svg'
import PinWhiteIcon from '@assets/icons/pin-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
// import { DefaultCardContainer } from '../DefaultCardContainer'
import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

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
		<DefaultTouchableCardContainer
			pressionable={!!onEdit}
			onPress={onEdit}
		>
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
		</DefaultTouchableCardContainer>
	)
}

export { CultureTypeCard }
