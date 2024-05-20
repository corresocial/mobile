import React from 'react'
import { useTheme } from 'styled-components'

import { PollQuestion } from '@domain/poll/entity/types'

import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { AnswerBinaryQuestionScreenProps } from '@routes/Stack/PollStack/screenProps'

import { ButtonOptionsContainer, Container, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { ProgressBar } from '@components/ProgressBar'

function AnswerBinaryQuestion({ route, navigation }: AnswerBinaryQuestionScreenProps) {
	const { getNextQuestion, getResponseProgess, saveResponseData } = usePollRegisterContext()

	const theme = useTheme()

	const { questionData } = route.params
	const responseProgress = getResponseProgess(questionData.questionId)

	const navigateBackwards = () => navigation.goBack()

	const selectBinaryOption = (value: boolean) => {
		saveResponseData(questionData, value)
		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: PollQuestion | null) => {
		if (nextQuestion === null) return navigation.navigate('FinishedPollResponse')

		switch (nextQuestion.questionType) {
			case 'binary': return navigation.push('AnswerBinaryQuestion', { questionData: nextQuestion })
			case 'satisfaction': return navigation.push('AnswerSatisfactionQuestion', { questionData: nextQuestion })
			case 'textual': return navigation.push('AnswerTextualQuestion', { questionData: nextQuestion })
			case 'numerical': return navigation.push('AnswerTextualQuestion', { questionData: nextQuestion })
			case 'select': return navigation.push('AnswerSelectQuestion', { questionData: nextQuestion })
		}
	}

	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(50)}
				centralized
				backgroundColor={theme.purple2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						fontSize={16}
						message={questionData.question}
						highlightedWords={questionData.question ? questionData.question.split(' ') : []}
					>
						<ProgressBar value={responseProgress[0]} range={responseProgress[1]} />
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			<FormContainer >
				<ButtonOptionsContainer>
					<PrimaryButton
						color={theme.green3}
						label={'sim'}
						labelColor={theme.white3}
						SecondSvgIcon={CheckWhiteIcon}
						onPress={() => selectBinaryOption(true)}
					/>
					<PrimaryButton
						color={theme.red3}
						label={'não'}
						labelColor={theme.white3}
						SvgIcon={XWhiteIcon}
						onPress={() => selectBinaryOption(false)}
					/>
				</ButtonOptionsContainer>
			</FormContainer>
		</Container>
	)
}

export { AnswerBinaryQuestion }
