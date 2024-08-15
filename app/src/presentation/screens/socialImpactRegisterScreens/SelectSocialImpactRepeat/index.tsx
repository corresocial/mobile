import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EventRepeatType } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'

import { SelectSocialImpactRepeatScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { theme } from '@common/theme'

import { PostRepeat } from '@components/_onboarding/PostRepeat'

function SelectSocialImpactRepeat({ route, navigation }: SelectSocialImpactRepeatScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveSocialImpactRepeat = async (repeat: EventRepeatType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ repeat })
			return navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.pink[2]} barStyle={'dark-content'} />
			<PostRepeat
				backgroundColor={theme.colors.pink[2]}
				itemsColor={theme.colors.pink[3]}
				navigateBackwards={() => navigation.goBack()}
				savePostRepeat={saveSocialImpactRepeat}
			/>
		</>
	)
}

export { SelectSocialImpactRepeat }
