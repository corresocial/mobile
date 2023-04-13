import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { InsertSocialImpactPictureScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { PostPicture } from '../../../components/_onboarding/PostPicture'

function InsertSocialImpactPicture({ navigation }: InsertSocialImpactPictureScreenProps) {
	const skipPostPicture = () => {
		navigation.navigate('SelectSocialImpactLocationView')
	}

	const navigateToPicturePreview = () => {
		navigation.navigate('SocialImpactPicturePreview')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostPicture
				backgroundColor={theme.pink2}
				progress={[2, 5]}
				navigateBackwards={() => navigation.goBack()}
				skipPostPicture={skipPostPicture}
				navigateToPicturePreview={navigateToPicturePreview}
			/>
		</>
	)
}

export { InsertSocialImpactPicture }
