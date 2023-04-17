import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactFrequencyScreenProps } from '../../../routes/Stack/socialImpactStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostFrequency } from '../../../components/_onboarding/PostFrequency'

function SelectSocialImpactFrequency({ route, navigation }: SelectSocialImpactFrequencyScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => navigation.navigate('SelectDaysOfWeek')

	const saveSocialImpactFrequency = (socialImpactFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (socialImpactFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: socialImpactFrequency,
						exhibitionWeekDays: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
					return
				}

				setSocialImpactDataOnContext({
					exhibitionFrequency: socialImpactFrequency,
					exhibitionWeekDays: [daysOfWeek[new Date().getDay()]]
				})
				navigation.navigate('SelectDaysOfWeek')
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: socialImpactFrequency,
						exhibitionWeekDays: [...daysOfWeek]
					})
					navigation.goBack()
					return
				}

				setSocialImpactDataOnContext({
					exhibitionFrequency: socialImpactFrequency,
					exhibitionWeekDays: [...daysOfWeek]
				})
				navigation.navigate('SelectDaysOfWeek')
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ exhibitionFrequency: socialImpactFrequency })
				} else {
					setSocialImpactDataOnContext({ exhibitionFrequency: socialImpactFrequency })
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
						exhibitionFrequency: socialImpactFrequency,
						exhibitionWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
					return
				}

				setSocialImpactDataOnContext({
					exhibitionFrequency: socialImpactFrequency,
					exhibitionWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
				})
				navigation.navigate('SelectDaysOfWeek')
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
				progress={[5, 5]}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveSocialImpactFrequency}
			/>
		</>
	)
}

export { SelectSocialImpactFrequency }
