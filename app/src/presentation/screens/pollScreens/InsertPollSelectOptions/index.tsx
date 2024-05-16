import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, Platform, ScrollView, StatusBar, TextInput } from 'react-native'
import uuid from 'react-uuid'

import { PollQuestion } from '@domain/poll/entity/types'

import { EditContext } from '@contexts/EditContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { InsertPollSelectOptionsScreenProps } from '@routes/Stack/PollStack/screenProps'

import { ButtonsContainer, Container } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

function InsertSelectOptions({ route, navigation }: InsertPollSelectOptionsScreenProps) {
	const { setRegisteredQuestionOnPollDataContext } = usePollRegisterContext()
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [selectOptionText, setQuestionText] = useState('')
	const [selectOptions, setSelectOptions] = useState<string[]>([])
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		inputCards: [
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null)
		],
		selectOptionTextInput: useRef<TextInput>(null),
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (Platform.OS === 'android') removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validatePollQuestions = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const moveToEditableInput = (text: string) => {
		setQuestionText(text)
	}

	const renderQuestionsSaved = () => {
		if (!questionsLength() || keyboardOpened) return <></>
		return selectOptions.map((currentQuestion, index) => (
			<React.Fragment key={uuid()}>
				<DefaultInput
					key={index as number}
					value={currentQuestion}
					relativeWidth={'100%'}
					textInputRef={inputRefs.inputCards[index]}
					defaultBackgroundColor={theme.white2}
					validBackgroundColor={theme.purple1}
					withoutBottomLine
					multiline
					lastInput
					numberOfLines={3}
					editable={false}
					uneditableMethod={moveToEditableInput}
					textAlign={'left'}
					fontSize={16}
					keyboardType={'default'}
					textIsValid
					onIconPress={() => removeQuestion(currentQuestion)}
					validateText={(text: string) => validatePollQuestions(text)}
					onChangeText={(text: string) => { }}
				/>
				<VerticalSpacing />
			</React.Fragment>
		))
	}

	const questionsLength = () => selectOptions.length

	const addNewQuestion = () => {
		if (questionsLength() === 5 || selectOptionText === '' || selectOptions.includes(selectOptionText)) return

		setSelectOptions([...selectOptions, selectOptionText])
		setQuestionText('')
	}

	const removeQuestion = (optionText: string) => {
		const newSelectOptions = selectOptions.filter((option: string) => option !== optionText)
		setSelectOptions(newSelectOptions)
	}

	const savePollQuestions = () => {
		if (route.params?.editMode) {
			addNewUnsavedFieldToEditContext({
				questions: [...(editDataContext.unsaved.questions || []), {
					questionId: uuid(),
					questionType: 'select',
					options: selectOptions,
					multiSelect: !!route.params.multiSelect,
					question: route.params.questionText,
				} as PollQuestion]
			})
		} else {
			setRegisteredQuestionOnPollDataContext('select', selectOptions, !!route.params.multiSelect)
		}

		navigation.push('InsertPollQuestions', { editMode: !!route.params?.editMode, initialValue: null })
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					fontSize={16}
					message={'adicione suas respostas para o campo de múltipla escolha'}
					highlightedWords={['respostas', 'múltipla', 'escolha']}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				withoutPaddingTop
				backgroundColor={theme.white3}
				justifyContent={questionsLength() < 1 ? 'center' : 'space-around'}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<VerticalSpacing height={relativeScreenHeight(3)} />
					{!keyboardOpened && renderQuestionsSaved()}
					{
						questionsLength() < 5
						&& (
							<DefaultInput
								key={12}
								value={selectOptionText}
								relativeWidth={'100%'}
								textInputRef={inputRefs.selectOptionTextInput}
								defaultBackgroundColor={theme.white2}
								validBackgroundColor={theme.purple1}
								withoutBottomLine
								lastInput
								multiline
								fontSize={16}
								onIconPress={!keyboardOpened ? () => { } : null}
								iconPosition={'left'}
								textAlignVertical={'center'}
								textAlign={'center'}
								placeholder={`opção ${selectOptions.length + 1}`}
								keyboardType={'default'}
								onPressKeyboardSubmit={addNewQuestion}
								validateText={(text: string) => false}
								onChangeText={(text: string) => setQuestionText(text)}
							/>

						)
					}
				</ScrollView>
				<VerticalSpacing />
				<ButtonsContainer>
					{
						(questionsLength() > 0 && !keyboardOpened)
						&& (
							<PrimaryButton
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={savePollQuestions}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container >
	)
}

export { InsertSelectOptions }
