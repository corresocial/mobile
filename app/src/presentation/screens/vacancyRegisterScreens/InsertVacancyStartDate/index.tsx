import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertVacancyStartDateScreenProps } from '@routes/Stack/VacancyStack/stackScreenProps'

import { theme } from '@common/theme'

import { PostDate } from '@components/_onboarding/PostDate'

function InsertVacancyStartDate({ route, navigation }: InsertVacancyStartDateScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startDate: '' })
			navigation.goBack()
		}
	}

	const saveVacancyStartDate = (dateTime: Date) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ startDate: dateTime })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : undefined}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveDate={saveVacancyStartDate}
			/>
		</>
	)
}

export { InsertVacancyStartDate }
