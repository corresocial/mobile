import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'
import { PostPicture } from '../../../components/_onboarding/PostPicture'

import { InsertVacancyPictureScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

function InsertVacancyPicture({ navigation }: InsertVacancyPictureScreenProps) {
	const skipPostPicture = () => {
		navigation.navigate('SelectWorkplace')
	}

	const navigateToPicturePreview = () => {
		navigation.navigate('VacancyPicturePreview')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostPicture
				backgroundColor={theme.yellow2}
				progress={[2, 5]}
				navigateBackwards={() => navigation.goBack()}
				skipPostPicture={skipPostPicture}
				navigateToPicturePreview={navigateToPicturePreview}
			/>
		</>
	)
}

export { InsertVacancyPicture }
