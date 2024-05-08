import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components'

import { PollQuestion } from '@domain/poll/entity/types'

import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { AnswerTextualQuestionScreenProps } from '@routes/Stack/PollStack/screenProps'

import { FormContent, Container, InstructionContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import { filterLeavingOnlyNumbers } from '@common/auxiliaryFunctions'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { ProgressBar } from '@components/ProgressBar'

function AnswerTextualQuestion({ route, navigation }: AnswerTextualQuestionScreenProps) {
	const { getNextQuestion, pollResponseData, getResponseProgess, saveResponseData } = usePollRegisterContext()

	const theme = useTheme()

	const [inputText, setInputText] = useState<string>('')

	const { questionData } = route.params
	const responseProgress = getResponseProgess(questionData.questionId)

	useEffect(() => {
		const questionIndex = pollResponseData.findIndex((res) => res.questionId === questionData.questionId)
		const questionResponse = pollResponseData[questionIndex].response || ''
		if (questionResponse) {
			setInputText(String(questionResponse))
		}
	}, [])

	const navigateBackwards = () => navigation.goBack()

	const changeInputField = (text: string) => {
		if (questionData.questionType === 'textual') return setInputText(text)

		const filteredText = filterLeavingOnlyNumbers(text)
		setInputText(filteredText)
	}

	const selectInputedText = () => {
		saveResponseData(questionData, inputText)
		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: PollQuestion | null) => {
		if (nextQuestion === null) return navigation.navigate('FinishedPollResponse')

		switch (nextQuestion?.questionType) {
			case 'binary': return navigation.push('AnswerBinaryQuestion', { questionData: nextQuestion })
			case 'satisfaction': return navigation.push('AnswerSatisfactionQuestion', { questionData: nextQuestion })
			case 'textual': return navigation.push('AnswerTextualQuestion', { questionData: nextQuestion })
			case 'numerical': return navigation.push('AnswerTextualQuestion', { questionData: nextQuestion })
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={theme.purple2}
				flexDirection={'column'}
			>
				<InstructionContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						fontSize={16}
						message={questionData.question}
						highlightedWords={questionData ? questionData.question.split(' ') : []}
					>
						<ProgressBar value={responseProgress[0]} range={responseProgress[1]} />
					</InstructionCard>
				</InstructionContainer>
			</DefaultHeaderContainer>
			<FormContainer >
				<FormContent>
					<DefaultInput
						value={inputText}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.purple1}
						lastInput
						fontSize={16}
						textIsValid={!!inputText}
						multiline={questionData.questionType === 'textual'}
						placeholder={'descreva seu post...'}
						keyboardType={questionData.questionType === 'textual' ? 'default' : 'numeric'}
						onChangeText={changeInputField}
					/>
					<PrimaryButton
						color={inputText ? theme.green3 : theme.yellow3}
						label={inputText ? 'continuar' : 'pular'}
						labelColor={inputText ? theme.white3 : theme.black4}
						SecondSvgIcon={inputText ? CheckWhiteIcon : DeniedWhiteIcon}
						onPress={selectInputedText}
					/>
				</FormContent>
			</FormContainer>
		</Container>
	)
}

export { AnswerTextualQuestion }
