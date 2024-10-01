/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionEmailScreenProps } from '@routes/Stack/PetitionStack/screenProps'
import { PetitionStackParamList } from '@routes/Stack/PetitionStack/types'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPetitionEmail({ navigation }: InsertPetitionEmailScreenProps) {
	const { setPetitionSignatureOnContext, petitionSignatureDataWithoutResponse } = usePetitionContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validatePetitionEmail = (text: string) => {
		const isValid = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{3,}$/.test(text)
		return (isValid && !keyboardOpened)
	}

	const savePetitionEmail = (inputText: string) => {
		setPetitionSignatureOnContext({ email: inputText })
		navigateToNextScreen()
	}

	const navigateToNextScreen = () => {
		const nextQuestions = petitionSignatureDataWithoutResponse()
		if (!nextQuestions) return navigation.navigate('FinishPetitionSignature')
		switch (nextQuestions[0]) { 	// TODO Type
			case 'cpf': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionCPF' as keyof PetitionStackParamList })
			case 'rg': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionRG' as keyof PetitionStackParamList })
			case 'telefone': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionPhone' as keyof PetitionStackParamList })
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.colors.purple[2]}
				validationColor={theme.colors.purple[1]}
				customTitle={'qual é o seu email?'}
				customHighlight={['email?']}
				inputPlaceholder={'escreva seu email aqui...'}
				keyboardOpened={keyboardOpened}
				validateInputText={validatePetitionEmail}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePetitionEmail}
			/>
		</>
	)
}

export { InsertPetitionEmail }
