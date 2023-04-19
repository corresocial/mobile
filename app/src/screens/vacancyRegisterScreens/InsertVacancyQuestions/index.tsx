import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { InsertVacancyQuestionsScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertVacancyQuestions({ navigation }: InsertVacancyQuestionsScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	const [vacancyQuestion, setVacancyQuestion] = useState<string>('')
	const [vacancyQuestions, setVacancyQuestions] = useState<string[]>([])
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		inputCards: [
			useRef<React.MutableRefObject<any>>(null),
			useRef<React.MutableRefObject<any>>(null),
			useRef<React.MutableRefObject<any>>(null)
		],
		vacancyQuestionInput: useRef<React.MutableRefObject<any>>(null),
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
	}, [vacancyQuestion, keyboardOpened])

	const validateVacancyQuestions = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const renderVacanciesQuestionsSaved = () => {
		if (!vacancyLength()) return null
		return vacancyQuestions.map((currentQuestion, index) => (
			<LineInput
				key={uuid()}
				value={currentQuestion}
				relativeWidth={'100%'}
				textInputRef={inputRefs.inputCards[index]}
				defaultBackgroundColor={theme.white2}
				defaultBorderBottomColor={theme.black4}
				validBackgroundColor={theme.yellow1}
				validBorderBottomColor={theme.yellow5}
				invalidBackgroundColor={theme.red1}
				invalidBorderBottomColor={theme.red5}
				editable={false}
				maxLength={100}
				lastInput
				textAlign={'left'}
				fontSize={16}
				keyboardType={'default'}
				textIsValid={true && !keyboardOpened}
				onIconPress={() => removeQuestion(index)}
				validateText={(text: string) => validateVacancyQuestions(text)}
				onChangeText={(text: string) => { }}/* editQuestion(text, index) In case edit cardQuestion */
			/>
		))
	}

	const vacancyLength = () => vacancyQuestions.length

	const addNewQuestion = () => {
		if (vacancyLength() === 3 || vacancyQuestion === '') return
		setVacancyQuestions([...vacancyQuestions, vacancyQuestion])
		setVacancyQuestion('')
	}

	/* const editQuestion = (question: string, index: number) => {
		const questions = [...vacancyQuestions]
		questions[index] = question
		setVacancyQuestions(questions)
	} */

	const removeQuestion = (index: number) => {
		const questions = [...vacancyQuestions]
		delete questions[index]
		setVacancyQuestions(questions.filter((question) => !question))
	}

	const saveVacancyQuestions = () => {
		setVacancyDataOnContext({
			questions: vacancyQuestions
		})
		navigation.navigate('InsertCompanyDescription')
	}

	const getPlaceholder = () => {
		switch (vacancyLength()) {
			case 0: {
				return '+ pergunta'
			}
			case 1: {
				return '+ segunda pergunta'
			}
			case 2: {
				return '+ terceira pergunta'
			}
			default: return false
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.yellow2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'quer adicionar até 3 perguntas para os candidatos?'}
					highlightedWords={['adicionar', 'até', '3', 'perguntas']}
				>
					<ProgressBar
						range={5}
						value={2}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={vacancyLength() < 1 ? 'center' : 'space-around'}
			>
				<>
					{
						vacancyLength() < 3
						&& (
							<LineInput
								key={4}
								value={vacancyQuestion}
								relativeWidth={'100%'}
								textInputRef={inputRefs.vacancyQuestionInput}
								defaultBackgroundColor={theme.white2}
								defaultBorderBottomColor={theme.black4}
								validBackgroundColor={theme.yellow1}
								validBorderBottomColor={theme.yellow5}
								invalidBackgroundColor={theme.red1}
								invalidBorderBottomColor={theme.red5}
								maxLength={100}
								lastInput
								textAlign={'left'}
								fontSize={16}
								placeholder={getPlaceholder() || ''}
								keyboardType={'default'}
								onPressKeyboardSubmit={addNewQuestion}
								validateText={(text: string) => false}
								onChangeText={(text: string) => setVacancyQuestion(text)}
							/>
						)
					}
					{
						!keyboardOpened && renderVacanciesQuestionsSaved()
					}
				</>
				<ButtonsContainer>
					{
						!keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={vacancyLength() < 1 ? theme.red3 : theme.green3}
								label={vacancyLength() < 1 ? 'não precisa, continuar' : 'continuar'}
								highlightedWords={['não', 'precisa']}
								labelColor={theme.white3}
								SvgIcon={vacancyLength() < 1 ? XWhiteIcon : CheckWhiteIcon}
								svgIconScale={['30%', '15%']}
								onPress={saveVacancyQuestions}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container >
	)
}

export { InsertVacancyQuestions }
