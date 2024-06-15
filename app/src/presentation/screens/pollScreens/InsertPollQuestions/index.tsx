import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlatList, Keyboard, ListRenderItem, Platform, ScrollView, StatusBar, TextInput } from 'react-native'
import uuid from 'react-uuid'

import { PollQuestion, PollQuestionOptional } from '@domain/poll/entity/types'

import { EditContext } from '@contexts/EditContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { InsertPollQuestionsScreenProps } from '@routes/Stack/PollStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { ButtonsContainer, Container, QuestionList } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import NumbersWhiteIcon from '@assets/icons/numbers-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import SatisfactionEmoji5WhiteIcon from '@assets/icons/satisfactionEmoji-5-white.svg'
import VerifiedLabelWhiteIcon from '@assets/icons/verifiedLabel.svg'
import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { QuestionCardControls } from '@components/_cards/QuestionCardControls'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { SelectQuestionTypeModal } from '@components/_modals/SelectQuestionTypeModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { ProgressBar } from '@components/ProgressBar'

function InsertPollQuestions({ route, navigation }: InsertPollQuestionsScreenProps) {
	const { pollRegisterDataContext, setPollQuestionRegisterDataOnContext, setRegisteredQuestionOnPollDataContext, removeQuestionFromRegisterContext } = usePollRegisterContext()
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [selectQuestionTypeModalIsVisible, setSelectQuestionTypeModalIsVisible] = useState(false)

	const questionListRef = useRef<FlatList | any>()

	const questionLimit = 60

	const scrollQuestionListToEnd = () => {
		setTimeout(() => {
			questionListRef && questionListRef.current && questionListRef.current.scrollToEnd({ animated: true })
		}, 100)
	}

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

	const moveToEditableInput = (text: string, questionId: string) => {
		setQuestionText(text)
		removeQuestion(questionId)
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
			case 'select':
				return CheckWhiteIcon
			default:
				return QuestionMarkWhiteIcon
		}
	}

	const questionsLength = () => questionsList.length

	const addNewQuestion = () => {
		if (questionsLength() === questionLimit || questionText === '') return

		setQuestionsList([...questionsList, { question: questionText }])
		setQuestionText('')
		setPollQuestionRegisterDataOnContext({ question: questionText })

		setSelectQuestionTypeModalIsVisible(true)
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

	const selectPollQuestionType = (questionType: PollQuestion['questionType']) => {
		setSelectQuestionTypeModalIsVisible(false)

		if (questionType === 'select') {
			return navigation.navigate('SelectNumberOfSelections', { ...route.params, selectOptions: [], editMode: !!route.params?.editMode })
		}

		if (route.params?.editMode) {
			addNewUnsavedFieldToEditContext({
				questions: [...(editDataContext.unsaved.questions || []), {
					questionId: uuid(),
					questionType,
					question: questionText,
				} as PollQuestion]
			})
		} else {
			setRegisteredQuestionOnPollDataContext(questionType)
		}

		scrollQuestionListToEnd()
	}

	const renderQuestions = ({ item }: FlatListItem<PollQuestion>) => {
		return (
			<QuestionCardControls
				title={item.question}
				CustonLeftIcon={getRelativeQuestionTypeIcon(item.questionType)}
				onEdit={() => moveToEditableInput(item.question, item.questionId)}
				onRemove={() => removeQuestion(item.questionId)}
			/>
		)
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<SelectQuestionTypeModal
				visibility={selectQuestionTypeModalIsVisible}
				closeModal={() => { }}
				onSelect={selectPollQuestionType}
			/>
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
					<ProgressBar value={3} range={4} />
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				withoutPaddingTop
				backgroundColor={theme.white3}
				justifyContent={questionsLength() < 1 ? 'center' : 'space-around'}
			>
				<QuestionList
					ref={questionListRef}
					data={getQuestionList()}
					renderItem={renderQuestions as ListRenderItem<unknown>}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <VerticalSpacing />}
					ListHeaderComponent={<VerticalSpacing height={3} />}
					ListFooterComponent={(
						<>
							<VerticalSpacing />
							{
								questionsLength() < questionLimit
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
							<VerticalSpacing height={3} />
						</>
					)}
				/>
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
