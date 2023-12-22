import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { SocialImpactPicturePreviewScreenProps } from '@routes/Stack/SocialImpactStack/stackScreenProps'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function SocialImpactPicturePreview({ route, navigation }: SocialImpactPicturePreviewScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const savePictures = (picturesUri: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesUri })
			navigation.goBack()
		}
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.pink2}
				editMode={editModeIsTrue()}
				initialValue={route.params?.initialValue || []}
				navigateBackwards={() => navigation.goBack()}
				savePictures={savePictures}
			/>
		</>
	)
}

export { SocialImpactPicturePreview }
