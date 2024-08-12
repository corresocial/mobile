import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertVacancyEndDateScreenProps } from '@routes/Stack/IncomeStack/screenProps'

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
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.colors.green[2]}
				validationColor={theme.colors.green[1]}
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
