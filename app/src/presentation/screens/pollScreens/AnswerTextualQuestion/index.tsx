import React, { useState } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components'

import { PollQuestionType } from '@domain/poll/entity/types'

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

function AnswerTextualQuestion({ navigation }: AnswerTextualQuestionScreenProps) {
	const navigateBackwards = () => navigation.goBack()

	const theme = useTheme()

	const [inputText, setInputText] = useState('')

	const question = 'Quem veio primeiro, o ovo ou a galinha?'
	const questionType: PollQuestionType = 'textual'
	const responseProgress = [1, 3]

	const changeInputField = (text: string) => {
		if (questionType === 'textual') return setInputText(text)

		const filteredText = filterLeavingOnlyNumbers(text)
		setInputText(filteredText)
	}

	const selectInputedText = () => {
		console.log(inputText)
		navigation.navigate('FinishedPollResponse')
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
						message={question}
						highlightedWords={question ? question.split(' ') : []}
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
						validBackgroundColor={theme.purple3}
						lastInput
						fontSize={16}
						multiline={questionType === 'textual'}
						placeholder={'descreva seu post...'}
						keyboardType={questionType === 'textual' ? 'default' : 'numeric'}
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
