import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { useCultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'

import { InsertCultureDescriptionScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertCultureDescription({ route, navigation }: InsertCultureDescriptionScreenProps) {
	const { setCultureDataOnContext, getAditionalDataFromLastPost } = useCultureContext()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		getAditionalDataFromLastPost()
	}, [])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validateCultureTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveCultureTitle = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: inputText })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ description: inputText, ...(route.params || {}) })
		navigation.navigate('SelectCulturePostMedia')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.blue[2]} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.colors.blue[2]}
				validationColor={theme.colors.blue[1]}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				validateInputText={validateCultureTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveCultureTitle}
			/>
		</>
	)
}

export { InsertCultureDescription }
