import React from 'react'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { Container, ContainerInner, QuestionContainer, QuestionTitle } from './styles'
import QuestionIcon from '@assets/icons/questionMark-white.svg'

interface QuestionCardProps {
	question: string;
	answer?: CitizenRegisterQuestionResponse['response'];
}

function QuestionCard({ question, answer }: QuestionCardProps) {
	return (
		<Container>
			<ContainerInner>
				<QuestionContainer>
					<QuestionIcon height={40} width={30} />
					<QuestionTitle>{question}</QuestionTitle>
				</QuestionContainer>
				{/* <AnswerContainer>
					<AnswerText>{'sim, por favor adoro batatas'}</AnswerText>
				</AnswerContainer> */}
			</ContainerInner>
		</Container>
	)
}

export { QuestionCard }
