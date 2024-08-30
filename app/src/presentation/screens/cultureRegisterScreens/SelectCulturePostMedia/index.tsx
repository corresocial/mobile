import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { useCultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'

import { SelectCulturePostMediaScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { convertToMediaAsset } from '@utils-ui/common/media/convetToMediaAsset'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function SelectCulturePostMedia({ route, navigation }: SelectCulturePostMediaScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { setCultureDataOnContext } = useCultureContext()

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveMedia = (picturesUrl: string[], videosUrl: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl, videosUrl })
			return navigation.goBack()
		}

		setCultureDataOnContext({ picturesUrl, videosUrl })
		navigation.navigate('SelectCultureRange')
	}

	const initialValue = convertToMediaAsset(route.params?.initialValue || { picturesUrl: [], videosUrl: [] })

	return (
		<>
			<StatusBar backgroundColor={theme.colors.blue[2]} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.colors.blue[2]}
				initialValue={initialValue}
				navigateBackwards={() => navigation.goBack()}
				saveMedia={saveMedia}
			/>
		</>
	)
}

export { SelectCulturePostMedia }
