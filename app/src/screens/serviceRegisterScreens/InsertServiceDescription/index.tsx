import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertServiceDescriptionScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { EditContext } from '../../../contexts/EditContext'
import { ServiceContext } from '../../../contexts/ServiceContext'

import { PostInputDescription } from '../../../components/_onboarding/PostInputDescription'

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

	const validateServiceDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveServiceDescription = (description: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({ description })
		navigation.navigate('ServicePicturePreview')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputDescription
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				inputPlaceholder={'ex: marcenaria especializada em projetos.'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, isSecondPost ? 3 : 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateServiceDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveServiceDescription}
			/>
		</>
	)
}

export { InsertServiceDescription }
