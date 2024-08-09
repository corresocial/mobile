import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { DaysOfWeek, WeekdaysFrequency } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'

import { SelectServiceFrequencyScreenProps } from '@routes/Stack/ServiceStack/screenProps'

import { theme } from '@common/theme'

import { PostFrequency } from '@components/_onboarding/PostFrequency'

function SelectServiceFrequency({ route, navigation }: SelectServiceFrequencyScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				attendanceFrequency: '',
				daysOfWeek: []
			})
			navigation.goBack()
		}
	}

	const saveServiceFrequency = (serviceFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (serviceFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						daysOfWeek: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
				}
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						daysOfWeek: [...daysOfWeek]
					})
					navigation.goBack()
				}
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ attendanceFrequency: serviceFrequency })
				}

				navigation.navigate('SelectServiceDaysOfWeek', {
					editMode: !!route.params?.editMode,
					initialValue: route.params?.initialValue as DaysOfWeek[]
				})
				break
			}
			case 'businessDay': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						daysOfWeek: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
				}

				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostFrequency
				backgroundColor={theme.colors.green[2]}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveServiceFrequency}
			/>
		</>
	)
}

export { SelectServiceFrequency }
