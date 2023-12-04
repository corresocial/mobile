import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactFrequencyScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../../services/firebase/types'

import { EditContext } from '../../../../contexts/EditContext'

import { PostFrequency } from '../../../components/_onboarding/PostFrequency'

function SelectSocialImpactFrequency({ route, navigation }: SelectSocialImpactFrequencyScreenProps) {
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

	const saveSocialImpactFrequency = (socialImpactFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (socialImpactFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: socialImpactFrequency,
						daysOfWeek: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
				}
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: socialImpactFrequency,
						daysOfWeek: [...daysOfWeek]
					})
					navigation.goBack()
				}
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ exhibitionFrequency: socialImpactFrequency })
				}

				navigation.navigate('SelectSocialImpactDaysOfWeek', {
					editMode: !!route.params?.editMode,
					initialValue: route.params?.initialValue as DaysOfWeek[]
				})
				break
			}
			case 'businessDay': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: socialImpactFrequency,
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
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostFrequency
				backgroundColor={theme.pink2}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveSocialImpactFrequency}
			/>
		</>
	)
}

export { SelectSocialImpactFrequency }
