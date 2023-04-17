import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectVacancyFrequencyScreenProps } from '../../../routes/Stack/vacancyStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostFrequency } from '../../../components/_onboarding/PostFrequency'

function SelectVacancyFrequency({ route, navigation }: SelectVacancyFrequencyScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertWorkStartHour')

	const saveVacancyFrequency = (vacancyFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (vacancyFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						workFrequency: vacancyFrequency,
						workWeekdays: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
					return
				}

				setVacancyDataOnContext({
					workFrequency: vacancyFrequency,
					workWeekdays: [daysOfWeek[new Date().getDay()]]
				})
				navigation.navigate('InsertWorkStartHour')
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						workFrequency: vacancyFrequency,
						workWeekdays: [...daysOfWeek]
					})
					navigation.goBack()
					return
				}

				setVacancyDataOnContext({
					workFrequency: vacancyFrequency,
					workWeekdays: [...daysOfWeek]
				})
				navigation.navigate('InsertWorkStartHour')
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ workFrequency: vacancyFrequency })
				} else {
					setVacancyDataOnContext({ workFrequency: vacancyFrequency })
				}

				navigation.navigate('SelectWorkWeekdays', {
					editMode: !!route.params?.editMode,
					initialValue: route.params?.initialValue as DaysOfWeek[]
				})
				break
			}
			case 'businessDay': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						workFrequency: vacancyFrequency,
						workWeekdays: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
					return
				}

				setVacancyDataOnContext({
					workFrequency: vacancyFrequency,
					workWeekdays: ['seg', 'ter', 'qua', 'qui', 'sex']
				})
				navigation.navigate('InsertWorkStartHour')
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostFrequency
				backgroundColor={theme.yellow2}
				progress={[5, 5]}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveVacancyFrequency}
			/>
		</>
	)
}

export { SelectVacancyFrequency }
