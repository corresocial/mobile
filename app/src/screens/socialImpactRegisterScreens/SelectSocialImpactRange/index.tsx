import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactRangeScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'
import { PostRange } from '../../../components/_onboarding/PostRange'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'

function SelectSocialImpactRange({ navigation }: SelectSocialImpactRangeScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)

	const savePostRange = (postRange: PostRangeType) => {
		setSocialImpactDataOnContext({ range: postRange })
		navigation.navigate('SelectSocialImpactLocationView')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.pink2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, 5]}
			/>
		</>
	)
}

export { SelectSocialImpactRange }
