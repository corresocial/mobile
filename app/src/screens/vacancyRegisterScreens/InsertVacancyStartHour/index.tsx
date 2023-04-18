import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertVacancyStartHourScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostStartTime } from '../../../components/_onboarding/PostStartTime'

function InsertVacancyStartHour({ route, navigation }: InsertVacancyStartHourScreenProps) {
	const { vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
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

	const skipScreen = () => navigation.navigate('InsertVacancyEndDate')

	const saveOpeningHour = (hour: string, minutes: string) => {
		const startWorkHour = new Date()
		startWorkHour.setHours(parseInt(hour), parseInt(minutes))

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startWorkHour })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ startWorkHour })
		if (vacancyDataContext.vacancyType === 'professional') {
			navigation.navigate('InsertVacancyEndHour')
		} else {
			navigation.navigate('InsertVacancyEndDate')
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostStartTime
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
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

export { InsertVacancyStartHour }
