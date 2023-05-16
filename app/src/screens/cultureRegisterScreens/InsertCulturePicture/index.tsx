import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { InsertCulturePictureScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'

import { PostPicture } from '../../../components/_onboarding/PostPicture'

function InsertCulturePicture({ navigation }: InsertCulturePictureScreenProps) {
	const { isSecondPost, cultureDataContext } = useContext(CultureContext)

	const skipPostPicture = () => {
		if (isSecondPost) {
			navigation.reset({
				index: 0,
				routes: [{
					name: 'EditCulturePostReview',
					params: {
						postData: { ...cultureDataContext },
						unsavedPost: true
					}
				}]
			})
			return
		}

		navigation.navigate('SelectEventPlaceModality')
	}

	const navigateToPicturePreview = () => {
		navigation.navigate('CulturePicturePreview')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostPicture
				backgroundColor={theme.blue2}
				progress={[2, isSecondPost ? 2 : 4]}
				navigateBackwards={() => navigation.goBack()}
				skipPostPicture={skipPostPicture}
				navigateToPicturePreview={navigateToPicturePreview}
			/>
		</>
	)
}

export { InsertCulturePicture }
