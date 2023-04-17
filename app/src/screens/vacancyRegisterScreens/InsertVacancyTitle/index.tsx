import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { InsertVacancyTitleScreenProps } from '../../../routes/Stack/vacancyStack/stackScreenProps'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputText } from '../../../components/_onboarding/PostInputText'

function InsertVacancyTitle({ route, navigation }: InsertVacancyTitleScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
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
			addNewUnsavedFieldToEditContext({ title: inputText })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ title: inputText })
		navigation.navigate('InsertVacancyDescription')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
				inputPlaceholder={'ex: pedreiro'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateVacancyTitle}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveVacancyTitle}
			/>
		</>
	)
}

export { InsertVacancyTitle }
