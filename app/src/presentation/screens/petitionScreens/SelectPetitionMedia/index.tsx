import React from 'react'
import { StatusBar } from 'react-native'

import { useEditContext } from '@contexts/EditContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { SelectPetitionMediaScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { theme } from '@common/theme'

import { PostPicturePreview } from '@components/_onboarding/PostPicturePreview'

function SelectPetitionMedia({ route, navigation }: SelectPetitionMediaScreenProps) {
	const { setPetitionDataOnContext } = usePetitionContext()
	const { addNewUnsavedFieldToEditContext } = useEditContext()

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveMedia = (picturesUri: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ picturesUrl: picturesUri })
			navigation.goBack()
			return
		}

		setPetitionDataOnContext({ picturesUrl: picturesUri })
		navigation.navigate('SelectPetitionRange')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostPicturePreview
				backgroundColor={theme.purple2}
				initialValue={route.params?.initialValue.picturesUrl || []}
				navigateBackwards={() => navigation.goBack()}
				saveMedia={saveMedia}
			/>
		</>
	)
}

export { SelectPetitionMedia }
