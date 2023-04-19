import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectCultureDaysOfWeekScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { DaysOfWeek } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostDaysOfWeek } from '../../../components/_onboarding/PostDaysOfWeek'

function SelectCultureDaysOfWeek({ route, navigation }: SelectCultureDaysOfWeekScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('SelectEventRepeat')

	const saveDaysOfWeek = (selectedDaysOfWeek: DaysOfWeek[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ daysOfWeek: selectedDaysOfWeek })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ daysOfWeek: selectedDaysOfWeek })
		navigation.navigate('SelectEventRepeat')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostDaysOfWeek
				backgroundColor={theme.blue2}
				validationColor={theme.blue1}
				progress={[5, 5]}
				initialValue={editModeIsTrue() ? route.params?.initialValue : []}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePostDaysOfWeek={saveDaysOfWeek}
			/>
		</>
	)
}

export { SelectCultureDaysOfWeek }
