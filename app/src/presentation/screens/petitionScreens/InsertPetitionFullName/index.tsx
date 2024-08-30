import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionFullNameScreenProps } from '@routes/Stack/PetitionStack/screenProps'
import { PetitionStackParamList } from '@routes/Stack/PetitionStack/types'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPetitionFullName({ navigation }: InsertPetitionFullNameScreenProps) {
	const { petitionSignatureData, petitionSignatureDataWithoutResponse, setPetitionSignatureOnContext } = usePetitionContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validatePetitionFullName = (text: string) => {
		const isValid = (text).trim().length >= 1 && (text).trim().split(' ').length >= 2
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const savePetitionFullName = async (inputText: string) => {
		setPetitionSignatureOnContext({ userName: inputText })

		if (petitionSignatureData.email) {
			return navigateToNextScreen()
		}

		navigation.navigate('InsertPetitionEmail')
	}

	const navigateToNextScreen = () => {
		const nextQuestions = petitionSignatureDataWithoutResponse()
		if (!nextQuestions) return navigation.navigate('FinishPetitionSignature')
		switch (nextQuestions[0]) { 								// TODO Type
			case 'cpf': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionCPF' as keyof PetitionStackParamList })
			case 'rg': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionRG' as keyof PetitionStackParamList })
			case 'telefone': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionPhone' as keyof PetitionStackParamList })
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.colors.purple[2]}
				validationColor={theme.colors.purple[1]}
				customTitle={'qual o seu nome completo?'}
				customHighlight={['nome', 'completo?']}
				inputPlaceholder={'escreva seu nome aqui...'}
				keyboardOpened={keyboardOpened}
				validateInputText={validatePetitionFullName}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePetitionFullName}
			/>
		</>
	)
}

export { InsertPetitionFullName }
