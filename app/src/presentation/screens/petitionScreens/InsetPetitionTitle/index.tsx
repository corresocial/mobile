import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { useEditContext } from '@contexts/EditContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionTitleScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertPetitionTitle({ route, navigation }: InsertPetitionTitleScreenProps) {
	const { setPetitionDataOnContext } = usePetitionContext()
	const { addNewUnsavedFieldToEditContext, clearEditContext } = useEditContext()

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

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const validatePetitionTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const savePetitionTitle = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ title: inputText })
			navigation.goBack()
			return
		}

		setPetitionDataOnContext({ title: inputText })
		navigation.navigate('InsertPetitionDescription')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				customTitle={'qual o título do abaixo assinado?'}
				customHighlight={['título', 'abaixo', 'assinado?']}
				inputPlaceholder={'ex: reconstrução da praça...'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				validateInputText={validatePetitionTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePetitionTitle}
			/>
		</>
	)
}

export { InsertPetitionTitle }
