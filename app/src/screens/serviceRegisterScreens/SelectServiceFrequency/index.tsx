import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectServiceFrequencyScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostFrequency } from '../../../components/_onboarding/PostFrequency'

function SelectServiceFrequency({ route, navigation }: SelectServiceFrequencyScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertServiceStartHour')

	const saveServiceFrequency = (serviceFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (serviceFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						attendanceWeekDays: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
					return
				}

				setServiceDataOnContext({
					attendanceFrequency: serviceFrequency,
					attendanceWeekDays: [daysOfWeek[new Date().getDay()]]
				})
				navigation.navigate('InsertServiceStartHour')
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						attendanceWeekDays: [...daysOfWeek]
					})
					navigation.goBack()
					return
				}

				setServiceDataOnContext({
					attendanceFrequency: serviceFrequency,
					attendanceWeekDays: [...daysOfWeek]
				})
				navigation.navigate('InsertServiceStartHour')
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ attendanceFrequency: serviceFrequency })
				} else {
					setServiceDataOnContext({
						attendanceFrequency: serviceFrequency
					})
				}

				navigation.navigate('SelectDaysOfWeek', {
					editMode: !!route.params?.editMode,
					initialValue: route.params?.initialValue as DaysOfWeek[]
				})
				break
			}
			case 'businessDay': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						attendanceWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
					return
				}

				setServiceDataOnContext({
					attendanceFrequency: serviceFrequency,
					attendanceWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
				})
				navigation.navigate('InsertServiceStartHour')
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostFrequency
				backgroundColor={theme.purple2}
				progress={[5, 5]}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveServiceFrequency}
			/>
		</>
	)
}

export { SelectServiceFrequency }
