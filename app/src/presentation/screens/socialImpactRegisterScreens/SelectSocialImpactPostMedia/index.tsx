import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { useSocialImpactContext } from '@contexts/SocialImpactContext'

import { SelectSocialImpactPostMediaScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { convertToMediaAsset } from '@utils-ui/common/media/convetToMediaAsset'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function SelectSocialImpactPostMedia({ route, navigation }: SelectSocialImpactPostMediaScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { setSocialImpactDataOnContext } = useSocialImpactContext()

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveMedia = (picturesUrl: string[], videosUrl: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl, videosUrl })
			return navigation.goBack()
		}

		setSocialImpactDataOnContext({ picturesUrl, videosUrl })
		navigation.navigate('SelectSocialImpactLocation', { locationView: 'approximate' })
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.pink[2]} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.colors.pink[2]}
				initialValue={convertToMediaAsset(route.params?.initialValue || { picturesUrl: [], videosUrl: [] })}
				navigateBackwards={() => navigation.goBack()}
				saveMedia={saveMedia}
			/>
		</>
	)
}

export { SelectSocialImpactPostMedia }
