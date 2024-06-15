import React from 'react'

import { Container, ContainerInner, QuestionContainer, QuestionTitle } from './styles'
import QuestionIcon from '@assets/icons/questionMark-white.svg'

interface QuestionCardProps{
	question: string;
	answer?: string;
}

function QuestionCard({ question, answer } : QuestionCardProps) {
	return (
		<Container>
			<ContainerInner>
				<QuestionContainer>
					<QuestionIcon height={40} width={30}/>
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