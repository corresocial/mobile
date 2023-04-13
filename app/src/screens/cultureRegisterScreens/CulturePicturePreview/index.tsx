import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { CulturePicturePreviewScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostPicturePreview } from '../../../components/_onboarding/PostPicturePreview'

function CulturePicturePreview({ route, navigation }: CulturePicturePreviewScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const savePictures = (picturesUri: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesUri })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ picturesUrl: picturesUri })
		navigation.navigate('SelectCultureLocationView')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

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
