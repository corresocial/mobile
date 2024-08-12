import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { useIncomeContext } from '@contexts/IncomeContext'

import { SelectPostPictureScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { convertToMediaAsset } from '@utils-ui/common/media/convetToMediaAsset'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function SelectPostPicture({ route, navigation }: SelectPostPictureScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { setIncomeDataOnContext } = useIncomeContext()

	const saveMedia = (picturesUrl: string[], videosUrl: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl, videosUrl })
			return navigation.goBack()
		}

		setIncomeDataOnContext({ picturesUrl, videosUrl })
		navigation.navigate('SelectIncomeLocation', { locationView: 'approximate' })
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

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

export { SelectPostPicture }
