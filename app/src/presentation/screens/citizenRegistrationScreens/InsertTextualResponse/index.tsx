import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertTextualResponseScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { Container, FormContent } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import { filterLeavingOnlyNumbers } from '@common/auxiliaryFunctions'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { FormContainer } from '@components/_containers/FormContainer'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { CitizenRegistrationHeader } from '@components/CitizenRegistrationHeader'

function InsertTextualResponse({ route, navigation }: InsertTextualResponseScreenProps) {
	const { getNextQuestion, citizenRegistrationResponseData, getResponseProgress, saveResponseData } = useCitizenRegistrationContext()

	const theme = useTheme()

	const [inputText, setInputText] = useState<string>('')

	const { questionData } = route.params
	const responseProgress = getResponseProgress(questionData.questionId)

	useEffect(() => {
		const questionIndex = citizenRegistrationResponseData.findIndex((res) => res.questionId === questionData.questionId)
		if (questionIndex < 0) return
		const questionResponse = citizenRegistrationResponseData[questionIndex].response || ''
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
		const nextResponse = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextResponse)
	}

	const skipQuestion = () => {
		saveResponseData(questionData, 'não se aplica') // MODEL use Case

		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextResponse: CitizenRegisterQuestionResponse | null) => {
		if (nextResponse === null) return navigation.navigate('FinishCitizenRegistration')

		switch (nextResponse?.questionType) {
			case 'binary': return navigation.push('InsertBinaryResponse', { questionData: nextResponse })
			case 'satisfaction': return navigation.push('InsertSatisfactionResponse', { questionData: nextResponse })
			case 'textual': return navigation.push('InsertTextualResponse', { questionData: nextResponse })
			case 'numerical': return navigation.push('InsertTextualResponse', { questionData: nextResponse })
			case 'select': return navigation.push('InsertSelectResponse', { questionData: nextResponse })
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<ScreenContainer topSafeAreaColor={theme.orange1}>
				<CitizenRegistrationHeader
					message={questionData.question}
					progress={responseProgress}
					navigateBackwards={navigateBackwards}
				/>
				<FormContainer >
					<FormContent>
						<DefaultInput
							value={inputText}
							defaultBackgroundColor={theme.white2}
							validBackgroundColor={theme.orange1}
							lastInput
							fontSize={16}
							textIsValid={!!inputText}
							multiline={questionData.questionType === 'textual'}
							placeholder={'digite aqui...'}
							keyboardType={questionData.questionType === 'textual' ? 'default' : 'numeric'}
							onChangeText={changeInputField}
						/>
						{
							inputText && (
								<PrimaryButton
									color={theme.green3}
									label={'continuar'}
									labelColor={theme.white3}
									SecondSvgIcon={CheckWhiteIcon}
									onPress={selectInputedText}
								/>
							)
						}
						{
							(!inputText && questionData.optional)
								? (
									<PrimaryButton
										color={theme.yellow3}
										label={'não se aplica'}
										SecondSvgIcon={DeniedWhiteIcon}
										onPress={skipQuestion}
									/>
								) : null
						}
					</FormContent>
				</FormContainer>
			</ScreenContainer>
		</Container>
	)
}

export { InsertTextualResponse }
