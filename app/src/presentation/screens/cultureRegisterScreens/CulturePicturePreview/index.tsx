import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { CulturePicturePreviewScreenProps } from '@routes/Stack/CultureStack/screenProps'
import { MediaAsset } from 'src/presentation/types'

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

	const convertToMediaAsset = () => {
		const medias = route.params?.initialValue
		const videosAssets: MediaAsset[] = medias?.videosUrl?.map((url) => ({
			url,
			mediaType: 'video',	
		})) ?? []
		const picturesAssets: MediaAsset[] = medias?.picturesUrl?.map((url) => ({
			url,
			mediaType: 'photo'
		})) ?? []

		return [...videosAssets ?? [], ...picturesAssets ?? []]
	}

	const mediaInitialValue = convertToMediaAsset()

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.blue2}
				initialValue={mediaInitialValue}
				navigateBackwards={() => navigation.goBack()}
				saveMedia={saveMedia}
			/>
		</>
	)
}

export { CulturePicturePreview }
