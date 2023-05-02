import React from 'react'
import uuid from 'react-uuid'

import { ImportantPointsContainer } from './styles'
import QuestionMarkWhiteIcon from '../../../assets/icons/questionMark-white.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface ImportantPointsCardProps {
	title?: string
	importantPoints?: string[]
}

function ImportantPointsCard({
	title,
	importantPoints = []
}: ImportantPointsCardProps) {
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
			<DefaultHeaderTitle
				title={title || 'importante'}
				highlightedWords={['importante']}
				SvgIcon={QuestionMarkWhiteIcon}
				dimensions={32}
			/>
			<ImportantPointsContainer>
				{renderImportantPoints()}
			</ImportantPointsContainer>
		</DefaultCardContainer >
	)
}

export { ImportantPointsCard }
