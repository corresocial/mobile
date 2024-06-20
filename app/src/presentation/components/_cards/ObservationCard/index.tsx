import React from 'react'

import { ActionsContainer, ContentContainer, Container, TitleContainer, Title, QuestionIndicator, ButtonArea, ObservationText } from './styles'
import TrashCanIcon from '@assets/icons/trash-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

interface ObservationCardProps{
    questionId: number, // CURRENT tipagem não está definida até o momento / mudar para obj do tipo observação
    observationText: string
    onDeleteObservation: (questionId: number) => void
}

function ObservationCard({ questionId = 0, observationText = 'texto', onDeleteObservation }: ObservationCardProps) {
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
				<ButtonArea activeOpacity={1}>
					<TrashCanIcon width={relativeScreenDensity(15)}/>
				</ButtonArea>
			</ActionsContainer>
		</Container>
	)
}

export { ObservationCard }