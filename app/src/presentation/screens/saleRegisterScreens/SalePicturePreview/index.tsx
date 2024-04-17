import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { SaleContext } from '@contexts/SaleContext'

import { SalePicturePreviewScreenProps } from '@routes/Stack/SaleStack/screenProps'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function SalePicturePreview({ route, navigation }: SalePicturePreviewScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveMedia = (picturesUrl: string[], videosUrl: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl, videosUrl })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ picturesUrl, videosUrl })
		navigation.navigate('SelectPaymentType')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const getInitialMedias = () => {
		if (editModeIsTrue()) {
			return {
				picturesUrl: [...(route.params?.initialValue.picturesUrl || [])],
				videosUrl: [...(route.params?.initialValue.videosUrl || [])]
			}
		}
		return { picturesUrl: [], videosUrl: [] }
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.green2}
				initialValue={getInitialMedias()}
				navigateBackwards={() => navigation.goBack()}
				saveMedia={saveMedia}
			/>
		</>
	)
}

export { SalePicturePreview }
