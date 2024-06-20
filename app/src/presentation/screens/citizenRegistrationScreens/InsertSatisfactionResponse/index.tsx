import React from 'react'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'
import { SatisfactionType } from '@domain/poll/entity/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertSatisfactionResponseScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { ButtonOptionsContainer } from './styles'
import SatisfactionEmoji1WhiteIcon from '@assets/icons/satisfactionEmoji-1-white.svg'
import SatisfactionEmoji2WhiteIcon from '@assets/icons/satisfactionEmoji-2-white.svg'
import SatisfactionEmoji3WhiteIcon from '@assets/icons/satisfactionEmoji-3-white.svg'
import SatisfactionEmoji4WhiteIcon from '@assets/icons/satisfactionEmoji-4-white.svg'
import SatisfactionEmoji5WhiteIcon from '@assets/icons/satisfactionEmoji-5-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { FormContainer } from '@components/_containers/FormContainer'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { CitizenRegistrationHeader } from '@components/CitizenRegistrationHeader'

function InsertSatisfactionResponse({ route, navigation }: InsertSatisfactionResponseScreenProps) {
	const { getNextQuestion, getResponseProgress, saveResponseData } = useCitizenRegistrationContext()

	const theme = useTheme()

	const { questionData } = route.params
	const responseProgress = getResponseProgress(questionData.questionId)

	const navigateBackwards = () => navigation.goBack()

	const selectSatisfactionOption = (value: SatisfactionType) => {
		saveResponseData(questionData, value)
		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: CitizenRegisterQuestionResponse | null) => {
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
			<FormContainer>
				<ButtonOptionsContainer>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.red3}
						SvgIcon={SatisfactionEmoji1WhiteIcon}
						onPress={() => selectSatisfactionOption(1)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.red2}
						SvgIcon={SatisfactionEmoji2WhiteIcon}
						onPress={() => selectSatisfactionOption(2)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.yellow3}
						SvgIcon={SatisfactionEmoji3WhiteIcon}
						onPress={() => selectSatisfactionOption(3)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.green2}
						SvgIcon={SatisfactionEmoji4WhiteIcon}
						onPress={() => selectSatisfactionOption(4)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.green3}
						SvgIcon={SatisfactionEmoji5WhiteIcon}
						onPress={() => selectSatisfactionOption(5)}
					/>
				</ButtonOptionsContainer>
			</FormContainer>
		</ScreenContainer>
	)
}

export { InsertSatisfactionResponse }
