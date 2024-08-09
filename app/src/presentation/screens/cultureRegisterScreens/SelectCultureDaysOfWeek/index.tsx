import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { DaysOfWeek } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'

import { SelectCultureDaysOfWeekScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { theme } from '@common/theme'

import { PostDaysOfWeek } from '@components/_onboarding/PostDaysOfWeek'

function SelectCultureDaysOfWeek({ route, navigation }: SelectCultureDaysOfWeekScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ daysOfWeek: [] })
			navigation.goBack()
			navigation.goBack()
		}
	}

	const saveDaysOfWeek = (selectedDaysOfWeek: DaysOfWeek[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ daysOfWeek: selectedDaysOfWeek })
			navigation.goBack()
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostDaysOfWeek
				backgroundColor={theme.colors.blue[2]}
				validationColor={theme.colors.blue[1]}
				initialValue={editModeIsTrue() ? route.params?.initialValue : []}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePostDaysOfWeek={saveDaysOfWeek}
			/>
		</>
	)
}

export { SelectCultureDaysOfWeek }
