import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { socialImpactCategories } from '../../../utils/postsCategories/socialImpactCategories'

import { SelectSocialImpactCategoryScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { SocialImpactCategories } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'

import { PostCategory } from '../../../components/_onboarding/PostCategory'

function SelectSocialImpactCategory({ route, navigation }: SelectSocialImpactCategoryScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)

	const onSelectCategory = (categoryName: SocialImpactCategories) => {
		setSocialImpactDataOnContext({
			category: categoryName
		})
		navigation.navigate('SelectSocialImpactTags', {
			categorySelected: categoryName,
			...route.params
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.pink2}
				categories={socialImpactCategories}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory}
				progress={[1, 5]}
			/>
		</>
	)
}

export { SelectSocialImpactCategory }
