import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar, Platform } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertCultureEndHourScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostTime } from '../../../components/_onboarding/PostTime'

function InsertCultureEndHour({ route, navigation }: InsertCultureEndHourScreenProps) {
	const { cultureDataContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext, editDataContext } = useContext(EditContext)

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
			addNewUnsavedFieldToEditContext({ endHour: '' })
			navigation.goBack()
		}
	}

	const saveEndTime = (hour: string, minutes: string) => {
		const endHour = new Date()
		endHour.setHours(parseInt(hour), parseInt(minutes))
		const ISOStringDateTime = new Date(endHour.getTime())

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour: ISOStringDateTime })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostTime
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				customTitle={'que horas você termina?'}
				customHighlight={['que', 'horas', 'termina']}
				editMode={editModeIsTrue()}
				startDate={editDataContext.unsaved.startDate || cultureDataContext.startDate}
				endDate={editDataContext.unsaved.endDate || cultureDataContext.endDate}
				startTime={editDataContext.unsaved.startHour || cultureDataContext.startHour}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTime={saveEndTime}
			/>
		</>
	)
}

export { InsertCultureEndHour }
