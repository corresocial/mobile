import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertVacancyDescriptionScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostInputDescription } from '../../../components/_onboarding/PostInputDescription'

function InsertVacancyDescription({ route, navigation }: InsertVacancyDescriptionScreenProps) {
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

	const validateVacancyDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveVacancyDescription = (description: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ description })
		navigation.navigate('InsertVacancyPicture')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostInputDescription
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
				inputPlaceholder={'ex: procuro um pedreiro que possa trabalhar final de semana'}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[2, 5]}
				keyboardOpened={keyboardOpened}
				validateInputText={validateVacancyDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveVacancyDescription}
			/>
		</>
	)
}

export { InsertVacancyDescription }
