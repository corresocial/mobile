import React from 'react'

import { ActionsContainer, ContentContainer, Container, TitleContainer, Title, QuestionIndicator, ButtonArea, ObservationText } from './styles'
import TrashCanIcon from '@assets/icons/trash-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

interface ObservationCardProps {
	questionId: string,
	observationText: string
	deleteObservation: (questionId: string) => void
}

function ObservationCard({ questionId, observationText = 'texto', deleteObservation }: ObservationCardProps) {
	const deleteRecord = () => {
		deleteObservation(questionId)
	}

	return (
		<Container>
			<ContentContainer>
				<TitleContainer>
					<Title>{'Observação - '}</Title>
					<QuestionIndicator>{`questão ${questionId}`}</QuestionIndicator>
				</TitleContainer>
				<ObservationText>
					{observationText}
				</ObservationText>
			</ContentContainer>
			<ActionsContainer>
				<ButtonArea onPress={deleteRecord}>
					<TrashCanIcon width={relativeScreenDensity(15)} />
				</ButtonArea>
			</ActionsContainer>
		</Container>
	)
}

export { ObservationCard }
