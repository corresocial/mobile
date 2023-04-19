import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertVacancyStartDateScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostDate } from '../../../components/_onboarding/PostDate'

function InsertVacancyStartDate({ route, navigation }: InsertVacancyStartDateScreenProps) {
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

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertVacancyStartHour')

	const saveVacancyStartDate = (year: string, month: string, day: string) => {
		const startDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startDate })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ startDate })
		navigation.navigate('InsertVacancyStartHour')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[5, 5]}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveStartDate={saveVacancyStartDate}
			/>
		</>
	)
}

export { InsertVacancyStartDate }
