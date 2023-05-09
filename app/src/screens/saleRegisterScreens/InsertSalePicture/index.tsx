import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { InsertSalePictureScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'

import { PostPicture } from '../../../components/_onboarding/PostPicture'

function InsertSalePicture({ navigation }: InsertSalePictureScreenProps) {
	const { isSecondPost } = useContext(SaleContext)

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
				progress={[2, isSecondPost ? 3 : 5]}
				navigateBackwards={() => navigation.goBack()}
				skipPostPicture={skipPostPicture}
				navigateToPicturePreview={navigateToPicturePreview}
			/>
		</>
	)
}

export { InsertSalePicture }
