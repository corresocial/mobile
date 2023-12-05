import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { SelectCultureFrequencyScreenProps } from '@routes/Stack/CultureStack/stackScreenProps'

import { DaysOfWeek, WeekdaysFrequency } from '@services/firebase/types'

import { theme } from '@common/theme'

import { PostFrequency } from '@components/_onboarding/PostFrequency'

function SelectCultureFrequency({ route, navigation }: SelectCultureFrequencyScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				exhibitionFrequency: '',
				daysOfWeek: []
			})
			navigation.goBack()
		}
	}

	const saveCultureFrequency = (cultureFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (cultureFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: cultureFrequency,
						daysOfWeek: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
				}
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: cultureFrequency,
						daysOfWeek: [...daysOfWeek]
					})
					navigation.goBack()
				}
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ exhibitionFrequency: cultureFrequency })
				}

				navigation.navigate('SelectCultureDaysOfWeek', {
					editMode: !!route.params?.editMode,
					initialValue: route.params?.initialValue as DaysOfWeek[]
				})
				break
			}
			case 'businessDay': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: cultureFrequency,
						daysOfWeek: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
				}

				break
			}
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostFrequency
				backgroundColor={theme.blue2}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveCultureFrequency}
			/>
		</>
	)
}

export { SelectCultureFrequency }
