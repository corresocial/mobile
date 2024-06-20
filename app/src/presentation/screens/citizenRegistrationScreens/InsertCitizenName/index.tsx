import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterModel } from '@domain/citizenRegister/adapter/CitizenRegisterModel'
import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { InsertCitizenNameScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'

import { PostInputText } from '@components/_onboarding/PostInputText'

const model = new CitizenRegisterModel()

function InsertCitizenName({ navigation }: InsertCitizenNameScreenProps) {
	const { citizenRegistrationQuestionToRespond, saveCitizenRegistrationIdentifier } = useCitizenRegistrationContext()

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
			const validName = new model.UserName(text, true).value
			return !!(validName && !keyboardOpened)
		} catch (error) {
			return false
		}
	}

	const saveName = async (inputText: string) => {
		try {
			const validName = new model.UserName(inputText, true).value
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
		<>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<PostInputText // REFACTOR Deve mudar de nome, sendo usado não só nos posts
				multiline
				backgroundColor={theme.orange2}
				validationColor={theme.orange1}
				customTitle={'Como você se chama?'}
				customHighlight={['nome', 'completo?']}
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
