import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { SocialImpactContext } from '@contexts/SocialImpactContext'

import { SocialImpactCategories } from '@services/firebase/types'

import { theme } from '../../../common/theme'
import { PostCategory } from '../../../components/_onboarding/PostCategory'
import { SelectSocialImpactCategoryScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { socialImpactCategories } from '../../../utils/postsCategories/socialImpactCategories'

function SelectSocialImpactCategory({ route, navigation }: SelectSocialImpactCategoryScreenProps) {
	const { isSecondPost, setSocialImpactDataOnContext } = useContext(SocialImpactContext)

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
				progress={[2, isSecondPost ? 5 : 6]}
			/>
		</>
	)
}

export { SelectSocialImpactCategory }
