import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertEventStartHourScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostStartTime } from '../../../components/_onboarding/PostStartTime'

function InsertEventStartHour({ route, navigation }: InsertEventStartHourScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
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

	const skipScreen = () => navigation.navigate('InsertEventEndHour')

	const saveOpeningHour = (hour: string, minutes: string) => {
		const eventStartHour = new Date()
		eventStartHour.setHours(parseInt(hour), parseInt(minutes))

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ eventStartHour })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ eventStartHour })
		navigation.navigate('InsertEventEndDate')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostStartTime
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[5, 5]}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveStartHour={saveOpeningHour}
			/>
		</>
	)
}

export { InsertEventStartHour }
