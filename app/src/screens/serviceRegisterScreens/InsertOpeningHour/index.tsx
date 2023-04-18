import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertOpeningHourScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostStartTime } from '../../../components/_onboarding/PostStartTime'

function InsertOpeningHour({ route, navigation }: InsertOpeningHourScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
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

	const skipScreen = () => navigation.navigate('InsertClosingHour')

	const saveOpeningHour = (hour: string, minutes: string) => {
		const openingHour = new Date()
		openingHour.setHours(parseInt(hour), parseInt(minutes))

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ openingHour })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({ openingHour })
		navigation.navigate('InsertClosingHour')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostStartTime
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
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

export { InsertOpeningHour }
