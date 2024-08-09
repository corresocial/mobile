import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { DaysOfWeek } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'

import { SelectSocialImpactDaysOfWeekScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { theme } from '@common/theme'

import { PostDaysOfWeek } from '@components/_onboarding/PostDaysOfWeek'

function SelectSocialImpactDaysOfWeek({ route, navigation }: SelectSocialImpactDaysOfWeekScreenProps) {
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
				backgroundColor={theme.colors.pink[2]}
				validationColor={theme.colors.pink[1]}
				initialValue={editModeIsTrue() ? route.params?.initialValue : []}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePostDaysOfWeek={saveDaysOfWeek}
			/>
		</>
	)
}

export { SelectSocialImpactDaysOfWeek }
