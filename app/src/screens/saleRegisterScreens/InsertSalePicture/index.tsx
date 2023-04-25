import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { InsertSalePictureScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { PostPicture } from '../../../components/_onboarding/PostPicture'

function InsertSalePicture({ navigation }: InsertSalePictureScreenProps) {
	const skipPostPicture = () => {
		navigation.navigate('SelectPaymentType')
	}

	const navigateToPicturePreview = () => {
		navigation.navigate('SalePicturePreview')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostPicture
				backgroundColor={theme.green2}
				progress={[2, 5]}
				navigateBackwards={() => navigation.goBack()}
				skipPostPicture={skipPostPicture}
				navigateToPicturePreview={navigateToPicturePreview}
			/>
		</>
	)
}

export { InsertSalePicture }
