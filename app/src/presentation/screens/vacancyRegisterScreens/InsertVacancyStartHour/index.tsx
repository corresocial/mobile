import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertVacancyStartHourScreenProps } from '@routes/Stack/VacancyStack/screenProps'

import { theme } from '@common/theme'

import { PostTime } from '@components/_onboarding/PostTime'

function InsertVacancyStartHour({ route, navigation }: InsertVacancyStartHourScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startHour: '' })
			navigation.goBack()
		}
	}

	const saveEndTime = (dateTime: Date) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startHour: dateTime })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostTime
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : undefined}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTime={saveEndTime}
			/>
		</>
	)
}

export { InsertVacancyStartHour }
