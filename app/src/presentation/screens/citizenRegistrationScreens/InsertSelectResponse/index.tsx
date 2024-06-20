import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Keyboard, ListRenderItem, Platform } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertSelectResponseScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { ButtonOptionsContainer, Container, OptionContainer, QuestionOptionsList } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SelectButton } from '@components/_buttons/SelectButton'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { CitizenRegistrationHeader } from '@components/CitizenRegistrationHeader'

function InsertSelectResponse({ route, navigation }: InsertSelectResponseScreenProps) {
	const { getNextQuestion, getResponseProgress, saveResponseData } = useCitizenRegistrationContext()

	const [selectedOptions, setSelectedOptions] = useState<string[]>([])

	const theme = useTheme()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const { questionData } = route.params
	// const questionData = {
	// 	questionId: '6',
	// 	question: 'Se sim, quais são as principais dificuldades que você enfrenta para atender às necessidades dos seus filhos? (Marque todas as opções que se aplicam)',
	// 	questionType: 'select',
	// 	multiSelect: true,
	// 	options: [
	// 		'Falta de recursos financeiros',
	// 		'Falta de acesso a serviços de saúde',
	// 		'Falta de acesso à educação de qualidade',
	// 		'Falta de atividades de lazer adequadas',
	// 		'Outros (especifique)'
	// 	],
	// 	allowOtherOptions: true,
	// 	response: []
	// }

	const { multiSelect } = questionData

	const responseProgress = getResponseProgress(questionData.questionId)

	const navigateBackwards = () => navigation.goBack()

	const [inputText, setInputText] = useState<string>('')

	const optionListRef = useRef<FlatList | any>()

	const selectOption = (option: string) => {
		if (questionData && questionData.options && questionData.options.length && questionData.options[questionData.options.length - 1] === option) {
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
					message={questionData.question}
					progress={responseProgress}
					navigateBackwards={navigateBackwards}
				/>
				<QuestionOptionsList
					ref={optionListRef}
					data={questionData.options || []}
					renderItem={renderQuestionsOption as ListRenderItem<unknown>}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={(
						<>
							{
								(
									lastElementHasSelected() ? (
										<>
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
										</>
									) : <></>
								)
							}
							< VerticalSpacing bottomNavigatorSpace />
						</>
					)}
				/>
				{!keyboardOpened && selectedOptions.length && (!lastElementHasSelected() || inputText) ? (
					<ButtonOptionsContainer>
						<PrimaryButton
							color={theme.green3}
							label={'continuar'}
							labelColor={theme.white3}
							SvgIcon={CheckWhiteIcon}
							onPress={saveQuestionResponse}
						/>
					</ButtonOptionsContainer>
				) : null}
			</Container>
		</ScreenContainer>
	)
}

export { InsertSelectResponse }
