import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertBinaryResponseScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { ButtonOptionsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { FormContainer } from '@components/_containers/FormContainer'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { CitizenRegistrationHeader } from '@components/CitizenRegistrationHeader'

function InsertBinaryResponse({ route, navigation }: InsertBinaryResponseScreenProps) {
	const { getNextQuestion, getResponseProgress, saveResponseData } = useCitizenRegistrationContext()

	const theme = useTheme()

	const [responseProgress, setResponseProgress] = useState([0, 0])

	const { questionData } = route.params

	useEffect(() => {
		const progress = getResponseProgress(questionData.questionId)
		setResponseProgress(progress)
	}, [])

	const navigateBackwards = () => navigation.goBack()

	const selectBinaryOption = (value: boolean) => {
		saveResponseData(questionData, value)
		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const skipQuestion = () => {
		saveResponseData(questionData, false) // MODEL use Case

		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: CitizenRegisterQuestionResponse | null) => {
		if (nextQuestion === null) return navigation.replace('FinishCitizenRegistration')

		switch (nextQuestion.questionType) {
			case 'binary': return navigation.replace('InsertBinaryResponse', { questionData: nextQuestion })
			case 'satisfaction': return navigation.replace('InsertSatisfactionResponse', { questionData: nextQuestion })
			case 'textual': return navigation.replace('InsertTextualResponse', { questionData: nextQuestion })
			case 'numerical': return navigation.replace('InsertTextualResponse', { questionData: nextQuestion })
			case 'select': return navigation.replace('InsertSelectResponse', { questionData: nextQuestion })
		}
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.colors.orange[1]}>
			<CitizenRegistrationHeader
				message={`${questionData.questionId} - ${questionData.question}`}
				progress={responseProgress}
				navigateBackwards={navigateBackwards}
			/>
			<FormContainer >
				<ButtonOptionsContainer>
					<PrimaryButton
						color={theme.colors.green[3]}
						label={'sim'}
						labelColor={theme.colors.white[3]}
						SecondSvgIcon={CheckWhiteIcon}
						onPress={() => selectBinaryOption(true)}
					/>
					<PrimaryButton
						color={theme.colors.red[3]}
						label={'não'}
						labelColor={theme.colors.white[3]}
						SvgIcon={XWhiteIcon}
						onPress={() => selectBinaryOption(false)}
					/>
				</ButtonOptionsContainer>
				{
					questionData.optional
						? (
							<ButtonOptionsContainer>
								<PrimaryButton
									color={theme.colors.yellow[3]}
									label={'não se aplica'}
									SecondSvgIcon={CheckWhiteIcon}
									onPress={skipQuestion}
								/>
							</ButtonOptionsContainer>
						) : <></>
				}
			</FormContainer>
		</ScreenContainer>
	)
}

export { InsertBinaryResponse }
