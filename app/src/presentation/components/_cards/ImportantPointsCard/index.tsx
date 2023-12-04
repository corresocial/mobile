import React from 'react'
import uuid from 'react-uuid'

import { ImportantPointsContainer } from './styles'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'

import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'
import { UiUtils } from '../../../utils-ui/common/UiUtils'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
import { DefaultCardContainer } from '../DefaultCardContainer'

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
		<DefaultCardContainer>
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
		</DefaultCardContainer >
	)
}

export { ImportantPointsCard }
