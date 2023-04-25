import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { cultureCategories, updateCultureTags } from '../../../utils/postsCategories/cultureCategories'

import { SelectCultureTagsScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostTags } from '../../../components/_onboarding/PostTags'

function SelectCultureTags({ route, navigation }: SelectCultureTagsScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const getCultureCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const addNewTag = (tagName: string) => {
		updateCultureTags(getCultureCategorySelected(), tagName)
	}

	const saveTags = (tagsSelected: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ tags: tagsSelected })
			navigation.goBack()
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ tags: tagsSelected })
		navigation.navigate('InsertCultureTitle')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.blue2}
				lightColor={theme.blue1}
				currentCategory={cultureCategories[getCultureCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectCultureTags }
