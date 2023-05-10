import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { cultureCategories } from '../../../utils/postsCategories/cultureCategories'

import { SelectCultureCategoryScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureCategories } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'

import { PostCategory } from '../../../components/_onboarding/PostCategory'

function SelectCultureCategory({ route, navigation }: SelectCultureCategoryScreenProps) {
	const { isSecondPost, setCultureDataOnContext, getAditionalDataFromLastPost } = useContext(CultureContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

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
				progress={[1, isSecondPost ? 2 : 4]}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory}
			/>
		</>
	)
}

export { SelectCultureCategory }
