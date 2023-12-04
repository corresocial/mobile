import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { ServicePicturePreviewScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../../contexts/ServiceContext'
import { EditContext } from '../../../../contexts/EditContext'

import { PostPicturePreview } from '../../../components/_onboarding/PostPicturePreview'

function ServicePicturePreview({ route, navigation }: ServicePicturePreviewScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const savePictures = (picturesUri: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesUri })
			navigation.goBack()
			return
		}

		setServiceDataOnContext({
			picturesUrl: picturesUri
		})
		navigation.navigate('SelectPaymentType')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.green2}
				editMode={editModeIsTrue()}
				initialValue={route.params?.initialValue || []}
				navigateBackwards={() => navigation.goBack()}
				savePictures={savePictures}
			/>
		</>
	)
}

export { ServicePicturePreview }
