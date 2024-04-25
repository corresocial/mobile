/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { useEditContext } from '@contexts/EditContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionEmailScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPetitionEmail({ navigation }: InsertPetitionEmailScreenProps) {
	const { setPetitionSignatureOnContext } = usePetitionContext()
	const { clearEditContext } = useEditContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		clearEditContext()
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validatePetitionEmail = (text: string) => {
		const isValid = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(text)
		return (isValid && !keyboardOpened)
	}

	const savePetitionEmail = (inputText: string) => {
		setPetitionSignatureOnContext({ email: inputText })
		// navigation.navigate('InsertPetitionEmail')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
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
