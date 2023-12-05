import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { SaleContext } from '@contexts/SaleContext'

import { SelectSaleCategoryScreenProps } from '@routes/Stack/SaleStack/stackScreenProps'
import { SaleCategories } from '@services/firebase/types'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

import { saleCategories } from '@utils/postsCategories/saleCategories'

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
				savePostCategory={onSelectCategory}
			/>
		</>
	)
}

export { SelectSaleCategory }
