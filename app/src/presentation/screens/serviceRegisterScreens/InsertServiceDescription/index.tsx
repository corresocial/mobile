import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { ServiceContext } from '@contexts/ServiceContext'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { theme } from '../../../common/theme'
import { PostInputText } from '../../../components/_onboarding/PostInputText'
import { InsertServiceDescriptionScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

function InsertServiceDescription({ route, navigation }: InsertServiceDescriptionScreenProps) {
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

	const validateServiceDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveServiceDescription = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: inputText })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({ description: inputText })
		navigation.navigate('SelectServiceRange')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[3, isSecondPost ? 3 : 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateServiceDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveServiceDescription}
			/>
		</>
	)
}

export { InsertServiceDescription }
