import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSaleDaysOfWeekScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { DaysOfWeek } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostDaysOfWeek } from '../../../components/_onboarding/PostDaysOfWeek'

function SelectSaleDaysOfWeek({ route, navigation }: SelectSaleDaysOfWeekScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertSaleStartHour')

	const saveDaysOfWeek = (selectedDaysOfWeek: DaysOfWeek[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ daysOfWeek: selectedDaysOfWeek })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ daysOfWeek: selectedDaysOfWeek })
		navigation.navigate('InsertSaleStartHour')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostDaysOfWeek
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				progress={[5, 5]}
				initialValue={editModeIsTrue() ? route.params?.initialValue : []}
				skipScreen={skipScreen}
				navigateBackwards={() => navigation.goBack()}
				savePostDaysOfWeek={saveDaysOfWeek}
			/>
		</>
	)
}

export { SelectSaleDaysOfWeek }
