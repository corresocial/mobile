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

	const onSelectCategory = (categoryName: SaleCategories) => {
		addNewUnsavedFieldToEditContext({ category: categoryName })
		navigation.navigate('SelectIncomeTags', { categorySelected: categoryName, ...route.params })
	}

	/* const skipScreen = () => { // CURRENT add skip
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ daysOfWeek: [] })
			navigation.goBack()
			navigation.goBack()
		}
	} */

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.colors.green[2]}
				categories={saleCategories}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory as GenericSelectPostCategoryType}
			/>
		</>
	)
}

export { SelectIncomeCategory }
