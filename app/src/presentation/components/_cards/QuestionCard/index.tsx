import React from 'react'
import uuid from 'react-uuid'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { AnswerContainer, AnswerText, Container, ContainerInner, QuestionContainer, QuestionTitle } from './styles'
import CheckMarkIcon from '@assets/icons/checkLabel-white.svg'
import MultiCheckMarkIcon from '@assets/icons/checks-white.svg'
import NumericalIcon from '@assets/icons/numbers-white.svg'
import TextualIcon from '@assets/icons/paperList-outlined.svg'
import SatisfactionIcon from '@assets/icons/satisfactionEmoji-5-white.svg'

interface QuestionCardProps {
	question: string;
	questionType: CitizenRegisterQuestionResponse['questionType'];
	answer?: CitizenRegisterQuestionResponse['response'];
}

function QuestionCard({ question, questionType, answer }: QuestionCardProps) {
	function QuestionIcon() {
		switch (questionType) {
			case 'binary':
				return (<CheckMarkIcon width={35}/>)
			case 'textual':
				return (<TextualIcon width={35}/>)
			case 'numerical':
				return (<NumericalIcon width={35}/>)
			case 'select':
				return (<MultiCheckMarkIcon width={35}/>)
			case 'satisfaction':
				return (<SatisfactionIcon width={35}/>)
		}
	} 

	const getNormalizedAnswer = () => {
		if (questionType === 'binary') {
			return answer ? 'sim' : 'não'
		} if (questionType === 'satisfaction') {
			if (answer === 1) return 'muito insatisfeito'
			if (answer === 2) return 'insatisfeito'
			if (answer === 3) return 'mais ou menos'
			if (answer === 4) return 'satisfeito'
			if (answer === 5) return 'muito satisfeito'
		}
		return answer
	}

	return (
		<Container>
			<ContainerInner>
				<QuestionContainer>
					<QuestionIcon/>
					<QuestionTitle>{question}</QuestionTitle>
				</QuestionContainer>
				{
					answer && ( 
						<AnswerContainer>
							{
								Array.isArray(answer) ? (
									answer.map((item) => (
										<AnswerText key={uuid()}>{`• ${item}`}</AnswerText>
									))
								) : (
									<AnswerText>{getNormalizedAnswer()}</AnswerText>
								)
							}
						</AnswerContainer>
					)
				}
			</ContainerInner>
		</Container>
	)
}

export { QuestionCard }
