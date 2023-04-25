import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectVacancyFrequencyScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostFrequency } from '../../../components/_onboarding/PostFrequency'

function SelectVacancyFrequency({ route, navigation }: SelectVacancyFrequencyScreenProps) {
	const { vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertVacancyStartHour')

	const saveVacancyFrequency = (vacancyFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (vacancyFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						workFrequency: vacancyFrequency,
						daysOfWeek: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
					return
				}

				setVacancyDataOnContext({
					workFrequency: vacancyFrequency,
					daysOfWeek: [daysOfWeek[new Date().getDay()]]
				})
				navigation.navigate('InsertVacancyStartHour')
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						workFrequency: vacancyFrequency,
						daysOfWeek: [...daysOfWeek]
					})
					navigation.goBack()
					return
				}

				setVacancyDataOnContext({
					workFrequency: vacancyFrequency,
					daysOfWeek: [...daysOfWeek]
				})
				navigation.navigate('InsertVacancyStartHour')

				if (vacancyDataContext.vacancyType === 'professional') {
					navigation.navigate('InsertVacancyStartHour')
				} else {
					navigation.navigate('InsertVacancyStartDate')
				}
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
						daysOfWeek: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
					return
				}

				setVacancyDataOnContext({
					workFrequency: vacancyFrequency,
					daysOfWeek: ['seg', 'ter', 'qua', 'qui', 'sex']
				})
				navigation.navigate('InsertVacancyStartHour')
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
