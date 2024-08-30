import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterModel } from '@domain/citizenRegister/adapter/CitizenRegisterModel'
import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertCitizenNameScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'

import { PostInputText } from '@components/_onboarding/PostInputText'

const citizenRegisterModel = new CitizenRegisterModel()

function InsertCitizenName({ navigation }: InsertCitizenNameScreenProps) {
	const { citizenRegistrationQuestionToRespond, citizenRegistrationIdentifier, saveCitizenRegistrationIdentifier } = useCitizenRegistrationContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const theme = useTheme()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validateName = (text: string) => {
		try {
			const validName = new citizenRegisterModel.UserName(text).value
			return !!(validName && !keyboardOpened)
		} catch (error) {
			return false
		}
	}

	const saveName = async (inputText: string) => {
		try {
			const validName = new citizenRegisterModel.UserName(inputText).value
			saveCitizenRegistrationIdentifier({ name: validName })
			startCitizenQuestionary()
		} catch (error) {
			console.log(error)
		}
	}

	const startCitizenQuestionary = () => {
		const firstQuestion = citizenRegistrationQuestionToRespond[0]
		navigateToNextReponseScreen(firstQuestion)
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
		<>
			<StatusBar backgroundColor={theme.colors.orange[2]} barStyle={'dark-content'} />
			<PostInputText // REFACTOR Deve mudar de nome, sendo usado não só nos posts
				multiline
				initialValue={citizenRegistrationIdentifier.name}
				backgroundColor={theme.colors.orange[2]}
				validationColor={theme.colors.orange[1]}
				customTitle={'2 - Qual é o seu nome?'}
				customHighlight={['2', 'nome?']}
				inputPlaceholder={'escreva seu nome aqui...'}
				keyboardOpened={keyboardOpened}
				validateInputText={validateName}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveName}
			/>
		</>
	)
}

export { InsertCitizenName }
