import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SocialImpactPicturePreviewScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostPicturePreview } from '../../../components/_onboarding/PostPicturePreview'

function SocialImpactPicturePreview({ route, navigation }: SocialImpactPicturePreviewScreenProps) {
	const { isSecondPost, socialImpactDataContext, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const savePictures = (picturesUri: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesUri })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ picturesUrl: picturesUri })

		if (isSecondPost) {
			navigation.reset({
				index: 0,
				routes: [{
					name: 'EditSocialImpactPostReview',
					params: {
						postData: { ...socialImpactDataContext, picturesUrl: picturesUri },
						unsavedPost: true
					}
				}]
			})
			return
		}

		navigation.navigate('SelectSocialImpactRange')
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
