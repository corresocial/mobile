import React from 'react'
import uuid from 'react-uuid'

import { ImportantPointsContainer } from './styles'
import QuestionMarkWhiteIcon from '../../../assets/icons/questionMark-white.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

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

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'importante'}
					highlightedWords={['importante']}
					SvgIcon={QuestionMarkWhiteIcon}
					dimensions={32}
				/>
			</EditHeaderContainer>
			<ImportantPointsContainer>
				{renderImportantPoints()}
			</ImportantPointsContainer>
		</DefaultCardContainer >
	)
}

export { ImportantPointsCard }
