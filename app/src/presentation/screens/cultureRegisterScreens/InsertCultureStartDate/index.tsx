import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar, Platform } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { theme } from '../../../common/theme'
import { PostDate } from '../../../components/_onboarding/PostDate'
import { InsertCultureStartDateScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

function InsertCultureStartDate({ route, navigation }: InsertCultureStartDateScreenProps) {
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
			addNewUnsavedFieldToEditContext({ startDate: '' })
			navigation.goBack()
		}
	}

	const saveCultureStartDate = (year: string, month: string, day: string) => {
		const startDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startDate })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveDate={saveCultureStartDate}
			/>
		</>
	)
}

export { InsertCultureStartDate }
