import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertCultureEndDateScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { theme } from '@common/theme'

import { PostDate } from '@components/_onboarding/PostDate'

function InsertCultureEndDate({ route, navigation }: InsertCultureEndDateScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate: '' })
			navigation.goBack()
		}
	}

	const saveCultureStartDate = (endDate: Date) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.blue[2]} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.colors.blue[2]}
				validationColor={theme.colors.blue[1]}
				customTitle={'que dia termina?'}
				customHighlight={['dia', 'termina']}
				initialValue={editModeIsTrue() ? route.params?.initialValue : undefined}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveDate={saveCultureStartDate}
			/>
		</>
	)
}

export { InsertCultureEndDate }
