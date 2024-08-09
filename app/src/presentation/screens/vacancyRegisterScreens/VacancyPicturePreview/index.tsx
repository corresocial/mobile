import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { VacancyPicturePreviewScreenProps } from '@routes/Stack/VacancyStack/screenProps'

import { convertToMediaAsset } from '@utils-ui/common/media/convetToMediaAsset'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function VacancyPicturePreview({ route, navigation }: VacancyPicturePreviewScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveMedia = (picturesUrl: string[], videosUrl: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl, videosUrl })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.colors.green[2]}
				initialValue={convertToMediaAsset(route.params?.initialValue || { picturesUrl: [], videosUrl: [] })}
				navigateBackwards={() => navigation.goBack()}
				saveMedia={saveMedia}
			/>
		</>
	)
}

export { VacancyPicturePreview }
