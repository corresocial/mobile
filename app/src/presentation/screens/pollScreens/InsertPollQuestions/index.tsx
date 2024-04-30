import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, Platform, ScrollView, StatusBar, TextInput } from 'react-native'

import { PollQuestion, PollQuestionOptional } from '@domain/poll/entity/types'

import { EditContext } from '@contexts/EditContext'
import { PollRegisterContext } from '@contexts/PollRegisterContext'

import { InsertPollQuestionsScreenProps } from '@routes/Stack/PollStack/screenProps'

import { ButtonsContainer, Container } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import NumbersWhiteIcon from '@assets/icons/numbers-white.svg'
import SatisfactionEmoji5WhiteIcon from '@assets/icons/satisfactionEmoji-5-white.svg'
import VerifiedLabelWhiteIcon from '@assets/icons/verifiedLabel.svg'
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
import { ProgressBar } from '@components/ProgressBar'

function InsertPollQuestions({ route, navigation }: InsertPollQuestionsScreenProps) {
	const { pollRegisterDataContext, setPollQuestionRegisterDataOnContext, removeQuestionFromRegisterContext } = useContext(PollRegisterContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const getQuestionList = (): PollQuestion[] => {
		if (editDataContext.unsaved && editDataContext.unsaved.questions) {
			return (editDataContext.unsaved.questions || [])
		}

		return route.params?.initialValue || pollRegisterDataContext.questions as PollQuestion[]
	}

	const initialPollQuestions = getQuestionList()

	const [questionText, setQuestionText] = useState('')
	const [questionsList, setQuestionsList] = useState<PollQuestionOptional[]>(initialPollQuestions || [])
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		inputCards: [
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null)
		],
		questionTextInput: useRef<TextInput>(null),
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
		const allQuestions = getQuestionList()

		if (!questionsLength() || keyboardOpened) return <></>
		return allQuestions.map((currentQuestion, index) => (
			<>
				<DefaultInput
					key={index as number}
					value={currentQuestion.question || ''}
					relativeWidth={'100%'}
					textInputRef={inputRefs.inputCards[index]}
					defaultBackgroundColor={theme.white2}
					validBackgroundColor={theme.purple1}
					CustonLeftIcon={currentQuestion.questionType && getRelativeQuestionTypeIcon(currentQuestion.questionType)}
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
					onIconPress={() => removeQuestion(currentQuestion.questionId)}
					validateText={(text: string) => validatePollQuestions(text)}
					onChangeText={(text: string) => { }}
				/>
				<VerticalSpacing />
			</>
		))
	}

	const getRelativeQuestionTypeIcon = (questionType: PollQuestion['questionType']) => {
		switch (questionType) {
			case 'satisfaction':
				return SatisfactionEmoji5WhiteIcon
			case 'numerical':
				return NumbersWhiteIcon
			case 'textual':
				return DescriptionWhiteIcon
			case 'binary':
				return VerifiedLabelWhiteIcon
			default:
				return undefined
		}
	}

	const questionsLength = () => questionsList.length

	const addNewQuestion = () => {
		if (questionsLength() === 10 || questionText === '') return

		setQuestionsList([...questionsList, { question: questionText }])
		setQuestionText('')
		setPollQuestionRegisterDataOnContext({ question: questionText })

		navigation.push('SelectPollQuestionType', { editMode: !!route.params?.editMode, questionText })
	}

	const removeQuestion = (questionId: string) => {
		const questions = getQuestionList()

		const newQuestionsList = questions.filter((question: any) => question.questionId !== questionId)

		setQuestionsList(newQuestionsList)

		if (route.params?.editMode) {
			return addNewUnsavedFieldToEditContext({ questions: newQuestionsList })
		}

		if (questionId) {
			removeQuestionFromRegisterContext(questionId)
		}
	}

	const savePollQuestions = () => {
		if (route.params?.editMode) {
			navigation.popToTop()
			return
		}

		navigation.navigate('SelectPollRange')
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
					message={'adicione suas perguntas'}
					highlightedWords={['perguntas']}
				>
					<ProgressBar range={3} value={3} />
				</InstructionCard>
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
						questionsLength() < 10
						&& (
							<DefaultInput
								key={12}
								value={questionText}
								relativeWidth={'100%'}
								textInputRef={inputRefs.questionTextInput}
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
								placeholder={'pergunta'}
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

export { InsertPollQuestions }
