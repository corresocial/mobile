import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { InsertSocialImpactPictureScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'

import { PostPicture } from '../../../components/_onboarding/PostPicture'

function InsertSocialImpactPicture({ navigation }: InsertSocialImpactPictureScreenProps) {
	const { isSecondPost, socialImpactDataContext } = useContext(SocialImpactContext)

	const skipPostPicture = () => {
		if (isSecondPost) {
			navigation.reset({
				index: 0,
				routes: [{
					name: 'EditSocialImpactPostReview',
					params: {
						postData: { ...socialImpactDataContext },
						unsavedPost: true
					}
				}]
			})
			return
		}

		navigation.navigate('SelectSocialImpactRange')
	}

	const navigateToPicturePreview = () => {
		navigation.navigate('SocialImpactPicturePreview')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostPicture
				backgroundColor={theme.pink2}
				progress={[2, isSecondPost ? 2 : 4]}
				navigateBackwards={() => navigation.goBack()}
				skipPostPicture={skipPostPicture}
				navigateToPicturePreview={navigateToPicturePreview}
			/>
		</>
	)
}

export { InsertSocialImpactPicture }
