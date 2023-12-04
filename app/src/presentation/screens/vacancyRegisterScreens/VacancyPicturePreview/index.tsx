import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { VacancyContext } from '@contexts/VacancyContext'

import { theme } from '@common/theme'

import { PostPicturePreview } from '../../../components/_onboarding/PostPicturePreview'
import { VacancyPicturePreviewScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

function VacancyPicturePreview({ route, navigation }: VacancyPicturePreviewScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const savePictures = (picturesUri: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesUri })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ picturesUrl: picturesUri })
		navigation.navigate('SelectWorkplace')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.green2}
				editMode={editModeIsTrue()}
				initialValue={route.params?.initialValue || []}
				navigateBackwards={() => navigation.goBack()}
				savePictures={savePictures}
			/>
		</>
	)
}

export { VacancyPicturePreview }
