import React from 'react'
import uuid from 'react-uuid'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { ImportantPointsContainer } from './styles'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

const { arrayIsEmpty } = UiUtils()

interface ImportantPointsCardProps {
	title?: string
	importantPoints?: string[]
	onEdit?: () => void
}

function ImportantPointsCard({ title, importantPoints = [], onEdit }: ImportantPointsCardProps) {
	const renderImportantPoints = () => {
		return importantPoints.map((point) => (
			<PostInfoRow
				key={uuid()}
				text={point}
				topic
			/>
		))
	}

	const getHeaderRightIcon = () => {
		return arrayIsEmpty(importantPoints) ? PlusWhiteIcon : undefined
	}

	return (
		<DefaultTouchableCardContainer
			pressionable={!!onEdit}
			onPress={onEdit}
		>
			<EditHeaderContainer onPress={onEdit} RightIcon={getHeaderRightIcon()}>
				<DefaultHeaderTitle
					title={title || 'importante'}
					highlightedWords={['importante']}
					SvgIcon={QuestionMarkWhiteIcon}
					dimensions={28}
				/>
			</EditHeaderContainer>
			{
				!arrayIsEmpty(importantPoints) && (
					<ImportantPointsContainer>
						{renderImportantPoints()}
					</ImportantPointsContainer>
				)
			}
		</DefaultTouchableCardContainer >
	)
}

export { ImportantPointsCard }
