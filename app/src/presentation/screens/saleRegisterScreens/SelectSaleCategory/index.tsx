import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { PostCategoriesType, SaleCategories } from '@domain/post/entity/types'

import { SaleContext } from '@contexts/SaleContext'

import { SelectSaleCategoryScreenProps } from '@routes/Stack/SaleStack/screenProps'

import { saleCategories } from '@utils/postsCategories/saleCategories'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

type GenericSelectPostCategoryType = (category: PostCategoriesType) => void

function SelectSaleCategory({ route, navigation }: SelectSaleCategoryScreenProps) {
	const { isSecondPost, setSaleDataOnContext } = useContext(SaleContext)

	const onSelectCategory = (categoryName: SaleCategories) => {
		setSaleDataOnContext({ category: categoryName })
		navigation.navigate('SelectSaleTags', { categorySelected: categoryName, ...route.params })
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.green2}
				categories={saleCategories}
				progress={[3, isSecondPost ? 5 : 6]}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory as GenericSelectPostCategoryType}
			/>
		</>
	)
}

export { SelectSaleCategory }
