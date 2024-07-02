import React from 'react'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { AnswerContainer, AnswerText, QuestionContainer, QuestionTitle } from './styles'
import CheckMarkIcon from '@assets/icons/checkLabel-white.svg'
import MultiCheckMarkIcon from '@assets/icons/checks-white.svg'
import NumericalIcon from '@assets/icons/numbers-white.svg'
import TextualIcon from '@assets/icons/paperList-outlined.svg'
import SatisfactionIcon from '@assets/icons/satisfactionEmoji-5-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

interface QuestionCardProps {
	question: string
	questionType: CitizenRegisterQuestionResponse['questionType']
	answer?: CitizenRegisterQuestionResponse['response']
	onPress?: () => void
}

function QuestionCard({ question, questionType, answer, onPress }: QuestionCardProps) {
	function QuestionIcon() {
		switch (questionType) {
			case 'binary':
				return (<CheckMarkIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />)
			case 'textual':
				return (<TextualIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />)
			case 'numerical':
				return (<NumericalIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />)
			case 'select':
				return (<MultiCheckMarkIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />)
			case 'satisfaction':
				return (<SatisfactionIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />)
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
		<DefaultTouchableCardContainer onPress={onPress} pressionable={!!onPress}>
			<QuestionContainer>
				<QuestionIcon />
				<QuestionTitle>{question}</QuestionTitle>
			</QuestionContainer>
			{
				answer && (
					<AnswerContainer>
						<VerticalSpacing height={5} relativeDensity />
						{
							Array.isArray(answer) ? (
								answer.map((item) => (
									<AnswerText key={item}>{`●  ${item}`}</AnswerText>
								))
							) : (
								<AnswerText>{getNormalizedAnswer()}</AnswerText>
							)
						}
					</AnswerContainer>
				)
			}
		</DefaultTouchableCardContainer >
	)
}

export { QuestionCard }
