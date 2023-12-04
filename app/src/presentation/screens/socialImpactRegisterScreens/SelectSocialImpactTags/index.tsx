import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { socialImpactCategories, updateSocialImpactTags } from '../../../utils/postsCategories/socialImpactCategories'

import { SelectSocialImpactTagsScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../../contexts/SocialImpactContext'
import { EditContext } from '../../../../contexts/EditContext'

import { PostTags } from '../../../components/_onboarding/PostTags'

function SelectSocialImpactTags({ route, navigation }: SelectSocialImpactTagsScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
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
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ tags: tagsSelected })
		navigation.navigate('SelectSocialImpactExhibitionRange')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.pink2}
				lightColor={theme.pink1}
				currentCategory={socialImpactCategories[getSocialImpactCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectSocialImpactTags }
