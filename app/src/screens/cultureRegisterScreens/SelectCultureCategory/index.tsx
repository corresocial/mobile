import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { cultureCategories } from '../../../utils/postsCategories/cultureCategories'

import { SelectCultureCategoryScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureCategories } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'

import { PostCategory } from '../../../components/_onboarding/PostCategory'

function SelectCultureCategory({ route, navigation }: SelectCultureCategoryScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)

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
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory}
				progress={[1, 4]}
			/>
		</>
	)
}

export { SelectCultureCategory }
