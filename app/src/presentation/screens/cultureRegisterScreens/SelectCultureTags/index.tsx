import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { useCultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'

import { SelectCultureTagsScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { cultureCategories, updateCultureTags } from '@utils/postsCategories/cultureCategories'

import { theme } from '@common/theme'

import { PostTags } from '@components/_onboarding/PostTags'

function SelectCultureTags({ route, navigation }: SelectCultureTagsScreenProps) {
	const { setCultureDataOnContext } = useCultureContext()
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
		navigation.navigate('InsertCultureDescription')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.colors.blue[2]} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.colors.blue[2]}
				lightColor={theme.colors.blue[1]}
				currentCategory={cultureCategories[getCultureCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectCultureTags }
