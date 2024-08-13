import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { SelectSocialImpactTagsScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { socialImpactCategories, updateSocialImpactTags } from '@utils/postsCategories/socialImpactCategories'

import { theme } from '@common/theme'

import { PostTags } from '@components/_onboarding/PostTags'

function SelectSocialImpactTags({ route, navigation }: SelectSocialImpactTagsScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const getSocialImpactCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const addNewTag = (tagName: string) => {
		updateSocialImpactTags(getSocialImpactCategorySelected(), tagName)
	}

	const saveTags = (tagsSelected: string[]) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				category: route.params.categorySelected,
				tags: tagsSelected
			})
			navigation.goBack()
			return navigation.goBack()
		}
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.colors.pink[2]} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.colors.pink[2]}
				lightColor={theme.colors.pink[1]}
				currentCategory={socialImpactCategories[getSocialImpactCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectSocialImpactTags }
