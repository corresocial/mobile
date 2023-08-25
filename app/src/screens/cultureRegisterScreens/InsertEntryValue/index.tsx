import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { InsertEntryValueScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { EditContext } from '../../../contexts/EditContext'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertEntryValue({ route, navigation }: InsertEntryValueScreenProps) {
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

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ entryValue: '' })
			navigation.goBack()
		}
	}

	const validateEntryValue = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveCultureEntryValue = (entryValue: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ entryValue })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				customTitle={'tem custo de entrada?'}
				customHighlight={['custo', 'de', 'entrada']}
				inputPlaceholder={'ex: 1kg de alimento'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				validateInputText={validateEntryValue}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTextData={saveCultureEntryValue}
			/>
		</>
	)
}

export { InsertEntryValue }
