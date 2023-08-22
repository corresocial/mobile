import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { InsertServiceTitleScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputText } from '../../../components/_onboarding/PostInputText'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

function InsertServiceTitle({ route, navigation }: InsertServiceTitleScreenProps) {
	const { isSecondPost, setServiceDataOnContext } = useContext(ServiceContext)
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

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const validateServiceTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveServiceTitle = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ title: inputText })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({ title: inputText })
		navigation.navigate('SelectServiceRange')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				inputPlaceholder={'ex: marcenaria'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, isSecondPost ? 3 : 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateServiceTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveServiceTitle}
			/>
		</>
	)
}

export { InsertServiceTitle }
