import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, Platform, StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertVacancyEndDateScreenProps } from '@routes/Stack/VacancyStack/stackScreenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostDate } from '@components/_onboarding/PostDate'

function InsertVacancyEndDate({ route, navigation }: InsertVacancyEndDateScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (Platform.OS === 'android') removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate: '' })
			navigation.goBack()
		}
	}

	const saveVacancyStartDate = (year: string, month: string, day: string) => {
		const endDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				customTitle={'que dia termina?'}
				customHighlight={['dia', 'termina']}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveDate={saveVacancyStartDate}
			/>
		</>
	)
}

export { InsertVacancyEndDate }
