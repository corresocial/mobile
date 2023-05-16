import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactRepeatScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { EventRepeatType } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostRepeat } from '../../../components/_onboarding/PostRepeat'

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
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRepeat
				backgroundColor={theme.pink2}
				progress={[4, 4]}
				navigateBackwards={() => navigation.goBack()}
				savePostRepeat={saveSocialImpactRepeat}
			/>
		</>
	)
}

export { SelectSocialImpactRepeat }
