import React from 'react'
import { StatusBar } from 'react-native'

import { CultureCategories, PostCategoriesType } from '@domain/post/entity/types'

import { useCultureContext } from '@contexts/CultureContext'

import { SelectCultureCategoryScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { cultureCategories } from '@utils/postsCategories/cultureCategories'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

type GenericSelectPostCategoryType = (category: PostCategoriesType) => void

function SelectCultureCategory({ route, navigation }: SelectCultureCategoryScreenProps) {
	const { isSecondPost } = useCultureContext()

	const onSelectCategory = (categoryName: CultureCategories) => {
		navigation.navigate('SelectCultureTags', {
			categorySelected: categoryName,
			...route.params
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.colors.blue[2]}
				categories={cultureCategories}
				progress={[2, isSecondPost ? 4 : 5]}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory as GenericSelectPostCategoryType}
			/>
		</>
	)
}

export { SelectCultureCategory }
