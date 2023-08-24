import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, Platform, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertVacancyEndDateScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'
import { PostDate } from '../../../components/_onboarding/PostDate'

function InsertVacancyEndDate({ route, navigation }: InsertVacancyEndDateScreenProps) {
	const { vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

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
			return
		}

		setVacancyDataOnContext({ endDate: '' as any })
		navigation.navigate('InsertVacancyEndHour')
	}

	const saveVacancyStartDate = (year: string, month: string, day: string) => {
		const endDate = new Date(`${year}-${month}-${day}T12:00:00`)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ endDate })
		navigation.navigate('InsertVacancyEndHour')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.yellow2}
				validationColor={theme.yellow1}
				customTitle={'quando termina?'}
				customHighlight={['termina']}
				editMode={editModeIsTrue()}
				startDate={editDataContext.unsaved.startDate || vacancyDataContext.startDate}
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
