import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { SocialImpactContext } from '@contexts/SocialImpactContext'

import { SelectSocialImpactRepeatScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'
import { EventRepeatType } from '@services/firebase/types'

import { theme } from '@common/theme'

import { PostRepeat } from '@components/_onboarding/PostRepeat'

function SelectSocialImpactRepeat({ route, navigation }: SelectSocialImpactRepeatScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveSocialImpactRepeat = async (repeat: EventRepeatType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ repeat })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ repeat })
		navigation.navigate('InsertSocialImpactStartDate')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostRepeat
				backgroundColor={theme.pink2}
				itemsColor={theme.pink3}
				navigateBackwards={() => navigation.goBack()}
				savePostRepeat={saveSocialImpactRepeat}
			/>
		</>
	)
}

export { SelectSocialImpactRepeat }
