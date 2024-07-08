import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { useEditContext } from '@contexts/EditContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionDescriptionScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPetitionDescription({ route, navigation }: InsertPetitionDescriptionScreenProps) {
	const { setPetitionDataOnContext } = usePetitionContext()
	const { addNewUnsavedFieldToEditContext } = useEditContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const validatePetitionDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const savePetitionDescription = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: inputText })
			navigation.goBack()
			return
		}

		setPetitionDataOnContext({ description: inputText })
		navigation.navigate('SelectIdentificationRequest')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				customTitle={'adicione uma descrição sobre o seu abaixo assinado'}
				customHighlight={['descrição', 'abaixo', 'assinado']}
				inputPlaceholder={'descreva seu abaixo assinado...'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				validateInputText={validatePetitionDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePetitionDescription}
			/>
		</>
	)
}

export { InsertPetitionDescription }
