import React from 'react'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestion } from '@domain/citizenRegister/model/entities/types'

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

	const { questionData } = route.params
	const responseProgress = getResponseProgress(questionData.questionId)

	const navigateBackwards = () => navigation.goBack()

	const selectBinaryOption = (value: boolean) => {
		saveResponseData(questionData, value)
		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: CitizenRegisterQuestion | null) => {
		if (nextQuestion === null) return navigation.navigate('FinishCitizenRegistration')

		switch (nextQuestion.questionType) {
			case 'binary': return navigation.push('InsertBinaryResponse', { questionData: nextQuestion })
			case 'satisfaction': return navigation.push('InsertSatisfactionResponse', { questionData: nextQuestion })
			case 'textual': return navigation.push('InsertTextualResponse', { questionData: nextQuestion })
			case 'numerical': return navigation.push('InsertTextualResponse', { questionData: nextQuestion })
			case 'select': return navigation.push('InsertSelectResponse', { questionData: nextQuestion })
		}
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.orange1}>
			<CitizenRegistrationHeader
				message={questionData.question}
				progress={responseProgress}
				navigateBackwards={navigateBackwards}
			/>
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
		</ScreenContainer>
	)
}

export { InsertBinaryResponse }
