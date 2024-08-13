import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Keyboard, ListRenderItem, Platform } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertSelectResponseScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { ButtonOptionsContainer, Container, InputContainer, OptionContainer, QuestionOptionsList } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SelectButton } from '@components/_buttons/SelectButton'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { CitizenRegistrationHeader } from '@components/CitizenRegistrationHeader'

function InsertSelectResponse({ route, navigation }: InsertSelectResponseScreenProps) {
	const { citizenRegistrationResponseData, getNextQuestion, getResponseProgress, saveResponseData } = useCitizenRegistrationContext()

	const [selectedOptions, setSelectedOptions] = useState<string[]>([])
	const [responseProgress, setResponseProgress] = useState([0, 0])

	const theme = useTheme()

	const [inputText, setInputText] = useState<string>('')
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const optionListRef = useRef<FlatList | any>()

	const { questionData } = route.params
	const { multiSelect } = questionData

	useEffect(() => {
		const progress = getResponseProgress(questionData.questionId)
		setResponseProgress(progress)
	}, [])

	useEffect(() => {
		const handleKeyboardDidShow = () => setKeyboardOpened(true)
		const handleKeyboardDidHide = () => setKeyboardOpened(false)

		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
			Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)
		})

		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const questionIndex = citizenRegistrationResponseData.findIndex((res) => res.questionId === questionData.questionId)
		if (questionIndex < 0) return
		const questionResponse = citizenRegistrationResponseData[questionIndex].response || []
		if (questionResponse) {
			setSelectedOptions(questionResponse as string[])
		}
	}, [])

	const navigateBackwards = () => navigation.goBack()

	const selectOption = (option: string) => {
		if (questionData && questionData.allowOtherOptions && questionData.options && questionData.options.length && questionData.options[questionData.options.length - 1] === option) {
			scrollOptionListToEnd()
		}

		if (multiSelect) {
			if (selectedOptions.includes(option)) {
				return setSelectedOptions(selectedOptions.filter((currentOption) => currentOption !== option))
			}
			return setSelectedOptions([...selectedOptions, option])
		}

		selectedOptions.length && selectedOptions.includes(option) ? setSelectedOptions([]) : setSelectedOptions([option])
	}

	const saveQuestionResponse = () => {
		if (lastElementHasSelected() && inputText) {
			saveResponseData(questionData, selectedOptions, inputText)
		} else {
			saveResponseData(questionData, selectedOptions)
		}

		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const skipQuestion = () => {
		saveResponseData(questionData, ['não se aplica'])
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

	const scrollOptionListToEnd = () => {
		setTimeout(() => {
			optionListRef && optionListRef.current && optionListRef.current.scrollToEnd({ animated: true })
		}, 100)
	}

	const lastElementHasSelected = () => {
		return questionData && questionData.options && questionData.allowOtherOptions && selectedOptions.includes(questionData.options[questionData.options.length - 1])
	}

	const renderQuestionsOption = ({ item }: FlatListItem<string>) => {
		return (
			<OptionContainer >
				<SelectButton
					backgroundSelected={theme.orange3}
					label={item}
					labelColor={selectedOptions.includes(item) ? theme.white3 : theme.black4}
					boldLabel
					fontSize={12}
					width={'100%'}
					height={'auto'}
					selected={selectedOptions.includes(item)}
					onSelect={() => selectOption(item)}
				/>
			</OptionContainer>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.orange1}>
			<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<CitizenRegistrationHeader
					message={`${questionData.questionId} - ${questionData.question}`}
					progress={responseProgress}
					navigateBackwards={navigateBackwards}
				/>
				<QuestionOptionsList
					ref={optionListRef}
					data={questionData.options || []}
					renderItem={renderQuestionsOption as ListRenderItem<unknown>}
					showsVerticalScrollIndicator={false}
					removeClippedSubviews={false}
					ListFooterComponent={(
						<>
							{
								lastElementHasSelected() && (
									<InputContainer>
										<DefaultInput
											value={inputText}
											defaultBackgroundColor={theme.white2}
											validBackgroundColor={theme.orange1}
											lastInput
											fontSize={16}
											textIsValid={!!inputText}
											multiline
											placeholder={'especifique sua resposta...'}
											keyboardType={'default'}
											onTouchEnd={scrollOptionListToEnd}
											onChangeText={setInputText}
										/>
									</InputContainer>
								)
							}
							<VerticalSpacing bottomNavigatorSpace />
						</>
					)}
				/>
				{
					!keyboardOpened && selectedOptions.length && (!lastElementHasSelected() || inputText)
						? (
							<ButtonOptionsContainer>
								<PrimaryButton
									color={theme.green3}
									label={'continuar'}
									labelColor={theme.white3}
									SvgIcon={CheckWhiteIcon}
									onPress={saveQuestionResponse}
								/>
							</ButtonOptionsContainer>
						) : null
				}
				{
					questionData.optional && !(!keyboardOpened && selectedOptions.length && (!lastElementHasSelected() || inputText) && questionData.optional)
						? (
							<ButtonOptionsContainer>
								<PrimaryButton
									color={theme.yellow3}
									label={'não se aplica'}
									SecondSvgIcon={DeniedWhiteIcon}
									onPress={skipQuestion}
								/>
							</ButtonOptionsContainer>
						) : null
				}
			</Container>
		</ScreenContainer>
	)
}

export { InsertSelectResponse }
