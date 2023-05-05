import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactFrequencyScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostFrequency } from '../../../components/_onboarding/PostFrequency'

function SelectSocialImpactFrequency({ route, navigation }: SelectSocialImpactFrequencyScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				exhibitionFrequency: '',
				daysOfWeek: []
			})
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({
			exhibitionFrequency: 'someday',
			daysOfWeek: []
		})
		navigation.navigate('SelectSocialImpactRepeat')
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
					return
				}

				setSocialImpactDataOnContext({
					exhibitionFrequency: socialImpactFrequency,
					daysOfWeek: [daysOfWeek[new Date().getDay()]]
				})
				navigation.navigate('SelectSocialImpactRepeat')
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						exhibitionFrequency: socialImpactFrequency,
						daysOfWeek: [...daysOfWeek]
					})
					navigation.goBack()
					return
				}

				setSocialImpactDataOnContext({
					exhibitionFrequency: socialImpactFrequency,
					daysOfWeek: [...daysOfWeek]
				})
				navigation.navigate('SelectSocialImpactRepeat')
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ exhibitionFrequency: socialImpactFrequency })
				} else {
					setSocialImpactDataOnContext({ exhibitionFrequency: socialImpactFrequency })
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
					return
				}

				setSocialImpactDataOnContext({
					exhibitionFrequency: socialImpactFrequency,
					daysOfWeek: ['seg', 'ter', 'qua', 'qui', 'sex']
				})
				navigation.navigate('SelectSocialImpactRepeat')
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
				progress={[4, 4]}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostFrequency={saveSocialImpactFrequency}
			/>
		</>
	)
}

export { SelectSocialImpactFrequency }
