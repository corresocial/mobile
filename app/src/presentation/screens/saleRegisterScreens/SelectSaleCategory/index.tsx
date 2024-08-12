import React from 'react'
import { StatusBar } from 'react-native'

import { PostCategoriesType, SaleCategories } from '@domain/post/entity/types'

import { useIncomeContext } from '@contexts/IncomeContext'

import { SelectSaleCategoryScreenProps } from '@routes/Stack/SaleStack/screenProps'

import { saleCategories } from '@utils/postsCategories/saleCategories'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

type GenericSelectPostCategoryType = (category: PostCategoriesType) => void

function SelectSaleCategory({ route, navigation }: SelectSaleCategoryScreenProps) {
	const { isSecondPost, setIncomeDataOnContext } = useIncomeContext()

	const onSelectCategory = (categoryName: SaleCategories) => {
		setIncomeDataOnContext({ category: categoryName })
		navigation.navigate('SelectSaleTags', { categorySelected: categoryName, ...route.params })
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.colors.green[2]}
				categories={saleCategories}
				progress={[3, isSecondPost ? 5 : 6]}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory as GenericSelectPostCategoryType}
			/>
		</>
	)
}

export { SelectSaleCategory }
