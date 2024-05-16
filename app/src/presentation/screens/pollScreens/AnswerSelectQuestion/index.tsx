import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { PollQuestion } from '@domain/poll/entity/types'

import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { AnswerSelectQuestionScreenProps } from '@routes/Stack/PollStack/screenProps'

import { ButtonOptionsContainer, Container, InstructionButtonContainer, OptionsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SelectButton } from '@components/_buttons/SelectButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { ProgressBar } from '@components/ProgressBar'

function AnswerSelectQuestion({ route, navigation }: AnswerSelectQuestionScreenProps) {
	const { getNextQuestion, getResponseProgess, saveResponseData } = usePollRegisterContext()

	const [selectedOptions, setSelectedOptions] = useState<string[]>([])

	const theme = useTheme()

	const { questionData } = route.params
	const { multiSelect } = questionData
	const responseProgress = getResponseProgess(questionData.questionId)

	const navigateBackwards = () => navigation.goBack()

	const saveQuestionResponse = () => {
		saveResponseData(questionData, selectedOptions)
		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: PollQuestion | null) => {
		if (nextQuestion === null) return navigation.navigate('FinishedPollResponse')

		switch (nextQuestion.questionType) {
			case 'binary': return navigation.push('AnswerSelectQuestion', { questionData: nextQuestion })
			case 'satisfaction': return navigation.push('AnswerSatisfactionQuestion', { questionData: nextQuestion })
			case 'textual': return navigation.push('AnswerTextualQuestion', { questionData: nextQuestion })
			case 'numerical': return navigation.push('AnswerTextualQuestion', { questionData: nextQuestion })
			case 'select': return navigation.push('AnswerSelectQuestion', { questionData: nextQuestion })
		}
	}

	const selectOption = (option: string) => {
		if (multiSelect) {
			if (selectedOptions.includes(option)) {
				return setSelectedOptions(selectedOptions.filter((currentOption) => currentOption !== option))
			}
			return setSelectedOptions([...selectedOptions, option])
		}

		selectedOptions.length && selectedOptions.includes(option) ? setSelectedOptions([]) : setSelectedOptions([option])
	}

	const renderQuestionOptions = () => {
		return (questionData.options || []).map((question) => {
			return (
				<SelectButton
					backgroundSelected={theme.purple3}
					label={question}
					labelColor={selectedOptions.includes(question) ? theme.white3 : theme.black4}
					boldLabel
					fontSize={12}
					width={'100%'}
					height={'auto'}
					selected={selectedOptions.includes(question)}
					onSelect={() => selectOption(question)}
				/>
			)
		})
	}

	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(30)}
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
			<OptionsContainer>
				{renderQuestionOptions()}
			</OptionsContainer>
			{
				!!selectedOptions.length && (
					<ButtonOptionsContainer>
						<PrimaryButton
							color={theme.green3}
							label={'continuar'}
							labelColor={theme.white3}
							SvgIcon={CheckWhiteIcon}
							onPress={saveQuestionResponse}
						/>
					</ButtonOptionsContainer>
				)
			}
		</Container>
	)
}

export { AnswerSelectQuestion }
