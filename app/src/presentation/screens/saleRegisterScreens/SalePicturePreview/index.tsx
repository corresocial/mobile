import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { SaleContext } from '@contexts/SaleContext'

import { SalePicturePreviewScreenProps } from '@routes/Stack/SaleStack/stackScreenProps'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function SalePicturePreview({ route, navigation }: SalePicturePreviewScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const savePictures = (picturesUri: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesUri })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ picturesUrl: picturesUri })
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

export { SalePicturePreview }
