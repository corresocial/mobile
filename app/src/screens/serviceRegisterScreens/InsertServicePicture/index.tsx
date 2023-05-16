import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'
import { PostPicture } from '../../../components/_onboarding/PostPicture'

import { InsertServicePictureScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'

function InsertServicePicture({ navigation }: InsertServicePictureScreenProps) {
	const { isSecondPost } = useContext(ServiceContext)

	const skipPostPicture = () => {
		navigation.navigate('SelectPaymentType')
	}

	const navigateToPicturePreview = () => {
		navigation.navigate('ServicePicturePreview')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostPicture
				backgroundColor={theme.purple2}
				progress={[2, isSecondPost ? 3 : 5]}
				navigateBackwards={() => navigation.goBack()}
				skipPostPicture={skipPostPicture}
				navigateToPicturePreview={navigateToPicturePreview}
			/>
		</>
	)
}

export { InsertServicePicture }
