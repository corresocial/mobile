import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactDaysOfWeekScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { DaysOfWeek } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostDaysOfWeek } from '../../../components/_onboarding/PostDaysOfWeek'

function SelectSocialImpactDaysOfWeek({ route, navigation }: SelectSocialImpactDaysOfWeekScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('SelectSocialImpactRepeat')

	const saveDaysOfWeek = (selectedDaysOfWeek: DaysOfWeek[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ daysOfWeek: selectedDaysOfWeek })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ daysOfWeek: selectedDaysOfWeek })
		navigation.navigate('SelectSocialImpactRepeat')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostDaysOfWeek
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				progress={[4, 4]}
				initialValue={editModeIsTrue() ? route.params?.initialValue : []}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePostDaysOfWeek={saveDaysOfWeek}
			/>
		</>
	)
}

export { SelectSocialImpactDaysOfWeek }
