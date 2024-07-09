import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { CulturePicturePreviewScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { convertToMediaAsset } from '@utils-ui/common/media/convetToMediaAsset'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function CulturePicturePreview({ route, navigation }: CulturePicturePreviewScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveMedia = (picturesUrl: string[], videosUrl: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl, videosUrl })

			navigation.goBack()
		}
	}

	const initialValue = convertToMediaAsset(route.params?.initialValue || { picturesUrl: [], videosUrl: [] })

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.blue2}
				initialValue={initialValue}
				navigateBackwards={() => navigation.goBack()}
				saveMedia={saveMedia}
			/>
		</>
	)
}

export { CulturePicturePreview }
