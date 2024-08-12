import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { useIncomeContext } from '@contexts/IncomeContext'

import { SelectSaleTagsScreenProps } from '@routes/Stack/SaleStack/screenProps'

import { saleCategories, updateSaleTags } from '@utils/postsCategories/saleCategories'

import { theme } from '@common/theme'

import { PostTags } from '@components/_onboarding/PostTags'

function SelectSaleTags({ route, navigation }: SelectSaleTagsScreenProps) {
	const { setIncomeDataOnContext } = useIncomeContext()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const getSaleCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const addNewTag = (tagName: string) => {
		updateSaleTags(getSaleCategorySelected(), tagName)
	}

	const saveTags = (tagsSelected: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				category: route.params.categorySelected,
				tags: tagsSelected
			})
			navigation.goBack()
			navigation.goBack()
			return
		}

		setIncomeDataOnContext({
			tags: tagsSelected
		})
		navigation.navigate('InsertSaleDescription')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

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

export { SelectSaleTags }
