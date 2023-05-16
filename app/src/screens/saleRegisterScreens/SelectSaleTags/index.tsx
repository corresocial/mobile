import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { saleCategories, updateSaleTags } from '../../../utils/postsCategories/saleCategories'

import { SelectSaleTagsScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostTags } from '../../../components/_onboarding/PostTags'

function SelectSaleTags({ route, navigation }: SelectSaleTagsScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
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

		setSaleDataOnContext({
			tags: tagsSelected
		})
		navigation.navigate('SelectItemStatus')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.green2}
				lightColor={theme.green1}
				currentCategory={saleCategories[getSaleCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectSaleTags }
