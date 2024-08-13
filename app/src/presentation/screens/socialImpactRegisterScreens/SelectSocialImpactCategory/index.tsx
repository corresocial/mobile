import React from 'react'
import { StatusBar } from 'react-native'

import { PostCategoriesType, SocialImpactCategories } from '@domain/post/entity/types'

import { SelectSocialImpactCategoryScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { socialImpactCategories } from '@utils/postsCategories/socialImpactCategories'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

type GenericSelectPostCategoryType = (category: PostCategoriesType) => void

function SelectSocialImpactCategory({ route, navigation }: SelectSocialImpactCategoryScreenProps) {
	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const onSelectCategory = (categoryName: SocialImpactCategories) => {
		if (editModeIsTrue()) {
			return navigation.navigate('SelectSocialImpactTags', {
				categorySelected: categoryName,
				...route.params
			})
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.colors.pink[2]}
				categories={socialImpactCategories}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory as GenericSelectPostCategoryType}
			/>
		</>
	)
}

export { SelectSocialImpactCategory }
