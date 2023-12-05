import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { SelectSocialImpactDaysOfWeekScreenProps } from '@routes/Stack/SocialImpactStack/stackScreenProps'

import { DaysOfWeek } from '@services/firebase/types'

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
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostDaysOfWeek
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				initialValue={editModeIsTrue() ? route.params?.initialValue : []}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePostDaysOfWeek={saveDaysOfWeek}
			/>
		</>
	)
}

export { SelectSocialImpactDaysOfWeek }
