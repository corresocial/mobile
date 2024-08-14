import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { SelectIncomeTagsScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { updateIncomeCategories } from '@utils/postsCategories/incomeCategories'
import { saleCategories } from '@utils/postsCategories/saleCategories'

import { theme } from '@common/theme'

import { PostTags } from '@components/_onboarding/PostTags'

function SelectIncomeTags({ route, navigation }: SelectIncomeTagsScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const getSaleCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const addNewTag = (tagName: string) => {
		updateIncomeCategories(getSaleCategorySelected(), tagName)
	}

	const saveTags = (tagsSelected: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				category: route.params.categorySelected,
				tags: tagsSelected
			})
			navigation.goBack()
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.colors.green[2]}
				lightColor={theme.colors.green[1]}
				currentCategory={saleCategories[getSaleCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectIncomeTags }
