import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertCultureDescriptionScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputDescription } from '../../../components/_onboarding/PostInputDescription'

function InsertCultureDescription({ route, navigation }: InsertCultureDescriptionScreenProps) {
	const { isSecondPost, setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validateCultureDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveCultureDescription = (description: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ description })
		navigation.navigate('InsertCulturePicture')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostInputDescription
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				inputPlaceholder={'ex: evento liberado pra geral do bairro'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, isSecondPost ? 2 : 4]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateCultureDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveCultureDescription}
			/>
		</>
	)
}

export { InsertCultureDescription }
