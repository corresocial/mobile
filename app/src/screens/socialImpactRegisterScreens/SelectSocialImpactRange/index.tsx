import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactRangeScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostRange } from '../../../components/_onboarding/PostRange'

function SelectSocialImpactRange({ route, navigation }: SelectSocialImpactRangeScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePostRange = (postRange: PostRangeType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
		}
		setSocialImpactDataOnContext({ range: postRange })
		navigation.navigate('SelectSocialImpactLocationView', {
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.pink2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[3, 4]}
			/>
		</>
	)
}

export { SelectSocialImpactRange }
