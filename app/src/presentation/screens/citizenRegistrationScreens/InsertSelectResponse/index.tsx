import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { PollQuestion } from '@domain/poll/entity/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertSelectResponseScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { ButtonOptionsContainer, OptionsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SelectButton } from '@components/_buttons/SelectButton'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { CitizenRegistrationHeader } from '@components/CitizenRegistrationHeader'

function InsertSelectResponse({ route, navigation }: InsertSelectResponseScreenProps) {
	const { getNextQuestion, getResponseProgress, saveResponseData } = useCitizenRegistrationContext()

	const [selectedOptions, setSelectedOptions] = useState<string[]>([])

	const theme = useTheme()

	const { questionData } = route.params
	const { multiSelect } = questionData

	const responseProgress = getResponseProgress(questionData.questionId)

	const navigateBackwards = () => navigation.goBack()

	const saveQuestionResponse = () => {
		saveResponseData(questionData, selectedOptions)
		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: PollQuestion | null) => {
		if (nextQuestion === null) return navigation.navigate('FinishCitizenRegistration')

		switch (nextQuestion.questionType) {
			case 'binary': return navigation.push('InsertBinaryResponse', { questionData: nextQuestion })
			case 'satisfaction': return navigation.push('InsertSatisfactionResponse', { questionData: nextQuestion })
			case 'textual': return navigation.push('InsertTextualResponse', { questionData: nextQuestion })
			case 'numerical': return navigation.push('InsertTextualResponse', { questionData: nextQuestion })
			case 'select': return navigation.push('InsertSelectResponse', { questionData: nextQuestion })
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
					backgroundSelected={theme.orange3}
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
		<ScreenContainer topSafeAreaColor={theme.orange1}>
			<CitizenRegistrationHeader
				message={questionData.question}
				progress={responseProgress}
				navigateBackwards={navigateBackwards}
			/>
			<OptionsContainer>
				{renderQuestionOptions()}
				<VerticalSpacing bottomNavigatorSpace />
			</OptionsContainer>
			<ButtonOptionsContainer >
				{
					!!selectedOptions.length && (
						<PrimaryButton
							color={theme.green3}
							label={'continuar'}
							labelColor={theme.white3}
							SvgIcon={CheckWhiteIcon}
							onPress={saveQuestionResponse}
						/>
					)
				}
			</ButtonOptionsContainer>
		</ScreenContainer>
	)
}

export { InsertSelectResponse }
