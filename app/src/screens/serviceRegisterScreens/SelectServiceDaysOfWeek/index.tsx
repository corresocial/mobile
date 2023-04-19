import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectServiceDaysOfWeekScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { DaysOfWeek } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostDaysOfWeek } from '../../../components/_onboarding/PostDaysOfWeek'

function SelectServiceDaysOfWeek({ route, navigation }: SelectServiceDaysOfWeekScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertServiceStartHour')

	const saveDaysOfWeek = (selectedDaysOfWeek: DaysOfWeek[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ daysOfWeek: selectedDaysOfWeek })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({ daysOfWeek: selectedDaysOfWeek })
		navigation.navigate('InsertServiceStartHour')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostDaysOfWeek
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				progress={[5, 5]}
				initialValue={editModeIsTrue() ? route.params?.initialValue : []}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePostDaysOfWeek={saveDaysOfWeek}
			/>
		</>
	)
}

export { SelectServiceDaysOfWeek }
