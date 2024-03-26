import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { CultureCategories } from '@domain/post/entity/types'

import { CultureContext } from '@contexts/CultureContext'

import { SelectCultureCategoryScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { cultureCategories } from '@utils/postsCategories/cultureCategories'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

function SelectCultureCategory({ route, navigation }: SelectCultureCategoryScreenProps) {
	const { isSecondPost, setCultureDataOnContext } = useContext(CultureContext)

	const onSelectCategory = (categoryName: CultureCategories) => {
		setCultureDataOnContext({
			category: categoryName
		})

		navigation.navigate('SelectCultureTags', {
			categorySelected: categoryName,
			...route.params
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.blue2}
				categories={cultureCategories}
				progress={[2, isSecondPost ? 4 : 5]}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory}
			/>
		</>
	)
}

export { SelectCultureCategory }
