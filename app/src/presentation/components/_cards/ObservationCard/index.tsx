import React from 'react'

import { CitizenRegisterQuestionObservation } from '@domain/citizenRegister/model/entities/types'

import { ActionsContainer, ContentContainer, Container, TitleContainer, Title, QuestionIndicator, ButtonArea, ObservationText } from './styles'
import TrashCanIcon from '@assets/icons/trash-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

interface ObservationCardProps {
	observationData: CitizenRegisterQuestionObservation
	deleteObservation: (observation: CitizenRegisterQuestionObservation) => void
}

function ObservationCard({ observationData, deleteObservation }: ObservationCardProps) {
	const deleteRecord = () => {
		deleteObservation(observationData)
	}

	return (
		<Container>
			<ContentContainer>
				<TitleContainer>
					<Title>{'Observação - '}</Title>
					<QuestionIndicator>{`questão ${observationData.questionId}`}</QuestionIndicator>
				</TitleContainer>
				<ObservationText>
					{observationData.message}
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
