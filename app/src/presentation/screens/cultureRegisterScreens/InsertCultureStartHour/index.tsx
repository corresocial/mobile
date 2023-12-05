import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar, Platform } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertCultureStartHourScreenProps } from '@routes/Stack/CultureStack/stackScreenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostTime } from '@components/_onboarding/PostTime'

function InsertCultureStartHour({ route, navigation }: InsertCultureStartHourScreenProps) {
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
			addNewUnsavedFieldToEditContext({ startHour: '' })
			navigation.goBack()
		}
	}

	const saveEndTime = (hour: string, minutes: string) => {
		const startHour = new Date()
		startHour.setHours(parseInt(hour), parseInt(minutes))
		const ISOStringDateTime = new Date(startHour.getTime())

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startHour: ISOStringDateTime })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostTime
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTime={saveEndTime}
			/>
		</>
	)
}

export { InsertCultureStartHour }
