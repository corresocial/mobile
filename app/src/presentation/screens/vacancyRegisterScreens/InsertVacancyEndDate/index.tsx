import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertVacancyEndDateScreenProps } from '@routes/Stack/VacancyStack/screenProps'

import { theme } from '@common/theme'

import { PostDate } from '@components/_onboarding/PostDate'

function InsertVacancyEndDate({ route, navigation }: InsertVacancyEndDateScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate: '' })
			navigation.goBack()
		}
	}

	const saveVacancyStartDate = (dateTime: Date) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate: dateTime })
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
				initialValue={editModeIsTrue() ? route.params?.initialValue : undefined}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveDate={saveVacancyStartDate}
			/>
		</>
	)
}

export { InsertVacancyEndDate }
