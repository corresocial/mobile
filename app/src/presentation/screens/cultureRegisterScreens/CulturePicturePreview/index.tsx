import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { theme } from '../../../common/theme'
import { PostPicturePreview } from '../../../components/_onboarding/PostPicturePreview'
import { CulturePicturePreviewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

function CulturePicturePreview({ route, navigation }: CulturePicturePreviewScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePictures = (picturesUri: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesUri })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.blue2}
				editMode={editModeIsTrue()}
				initialValue={route.params?.initialValue || []}
				navigateBackwards={() => navigation.goBack()}
				savePictures={savePictures}
			/>
		</>
	)
}

export { CulturePicturePreview }
