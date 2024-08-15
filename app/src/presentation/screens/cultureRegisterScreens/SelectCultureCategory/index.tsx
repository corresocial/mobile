import React from 'react'
import { StatusBar } from 'react-native'

import { CultureCategories, PostCategoriesType } from '@domain/post/entity/types'

import { useEditContext } from '@contexts/EditContext'

import { SelectCultureCategoryScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { cultureCategories } from '@utils/postsCategories/cultureCategories'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

type GenericSelectPostCategoryType = (category: PostCategoriesType) => void

function SelectCultureCategory({ route, navigation }: SelectCultureCategoryScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useEditContext()

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const onSelectCategory = (categoryName: CultureCategories) => {
		if (editModeIsTrue()) {
			return navigation.navigate('SelectCultureTags', {
				categorySelected: categoryName,
				...route.params
			})
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
				backgroundColor={theme.colors.blue[2]}
				categories={cultureCategories}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				savePostCategory={onSelectCategory as GenericSelectPostCategoryType}
			/>
		</>
	)
}

export { SelectCultureCategory }
