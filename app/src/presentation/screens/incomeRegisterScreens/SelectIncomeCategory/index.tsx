import React from 'react'
import { StatusBar } from 'react-native'

import { PostCategoriesType, SaleCategories } from '@domain/post/entity/types'

import { useEditContext } from '@contexts/EditContext'

import { SelectIncomeCategoryScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { saleCategories } from '@utils/postsCategories/saleCategories'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

type GenericSelectPostCategoryType = (category: PostCategoriesType) => void

function SelectIncomeCategory({ route, navigation }: SelectIncomeCategoryScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useEditContext()

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const onSelectCategory = (categoryName: SaleCategories) => {
		if (editModeIsTrue()) {
			return navigation.navigate('SelectIncomeTags', { categorySelected: categoryName, ...route.params })
		}
	}

	const skipScreen = () => {
		addNewUnsavedFieldToEditContext({ category: '', tags: [] })
		return navigation.goBack()
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.colors.green[2]}
				categories={saleCategories}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostCategory={onSelectCategory as GenericSelectPostCategoryType}
			/>
		</>
	)
}

export { SelectIncomeCategory }
