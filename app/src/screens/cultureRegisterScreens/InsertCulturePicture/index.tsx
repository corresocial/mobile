import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { InsertCulturePictureScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { PostPicture } from '../../../components/_onboarding/PostPicture'

function InsertCulturePicture({ navigation }: InsertCulturePictureScreenProps) {
	const skipPostPicture = () => {
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
				progress={[2, 4]}
				navigateBackwards={() => navigation.goBack()}
				skipPostPicture={skipPostPicture}
				navigateToPicturePreview={navigateToPicturePreview}
			/>
		</>
	)
}

export { InsertCulturePicture }
