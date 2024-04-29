import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { useEditContext } from '@contexts/EditContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionFullNameScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPetitionFullName({ navigation }: InsertPetitionFullNameScreenProps) {
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

	const validatePetitionFullName = (text: string) => {
		const isValid = (text).trim().length >= 1 && (text).trim().split(' ').length >= 2
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const savePetitionFullName = (inputText: string) => {
		setPetitionSignatureOnContext({ userName: inputText })
		navigation.navigate('InsertPetitionEmail')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
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
