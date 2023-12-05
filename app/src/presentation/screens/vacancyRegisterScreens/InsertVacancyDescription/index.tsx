import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { VacancyContext } from '@contexts/VacancyContext'

import { InsertVacancyDescriptionScreenProps } from '@routes/Stack/VacancyStack/stackScreenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertVacancyDescription({ route, navigation }: InsertVacancyDescriptionScreenProps) {
	const { isSecondPost, setVacancyDataOnContext } = useContext(VacancyContext)
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

	const validateVacancyTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveVacancyTitle = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: inputText })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ description: inputText })
		navigation.navigate('SelectWorkplace')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[3, isSecondPost ? 6 : 7]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateVacancyTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveVacancyTitle}
			/>
		</>
	)
}

export { InsertVacancyDescription }
