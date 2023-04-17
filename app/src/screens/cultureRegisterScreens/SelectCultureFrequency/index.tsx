import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectCultureFrequencyScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostFrequency } from '../../../components/_onboarding/PostFrequency'

function SelectCultureFrequency({ route, navigation }: SelectCultureFrequencyScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('InsertEventStartDate')

	const saveCultureFrequency = (cultureFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (cultureFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: cultureFrequency,
						exhibitionWeekDays: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
					return
				}

				setCultureDataOnContext({
					exhibitionFrequency: cultureFrequency,
					exhibitionWeekDays: [daysOfWeek[new Date().getDay()]]
				})
				navigation.navigate('InsertEventStartDate')
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: cultureFrequency,
						exhibitionWeekDays: [...daysOfWeek]
					})
					navigation.goBack()
					return
				}

				setCultureDataOnContext({
					exhibitionFrequency: cultureFrequency,
					exhibitionWeekDays: [...daysOfWeek]
				})
				navigation.navigate('InsertEventStartDate')
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ exhibitionFrequency: cultureFrequency })
				} else {
					setCultureDataOnContext({ exhibitionFrequency: cultureFrequency })
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
						exhibitionFrequency: cultureFrequency,
						exhibitionWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
					return
				}

				setCultureDataOnContext({
					exhibitionFrequency: cultureFrequency,
					exhibitionWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
				})
				navigation.navigate('InsertEventStartDate')
				break
			}
			default: return false
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostFrequency
				backgroundColor={theme.blue2}
				progress={[5, 5]}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveCultureFrequency}
			/>
		</>
	)
}

export { SelectCultureFrequency }
