import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { VacancyContext } from '@contexts/VacancyContext'

import { VacancyCategories } from '@services/firebase/types'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

import { SelectVacancyCategoryScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'

function SelectVacancyCategory({ route, navigation }: SelectVacancyCategoryScreenProps) {
	const { isSecondPost, setVacancyDataOnContext } = useContext(VacancyContext)

	const onSelectCategory = (categoryName: VacancyCategories) => {
		setVacancyDataOnContext({ category: categoryName })
		navigation.navigate('SelectVacancyTags', { categorySelected: categoryName, ...route.params })
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.green2}
				categories={vacancyCategories}
				progress={[2, isSecondPost ? 6 : 7]}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory}
			/>
		</>
	)
}

export { SelectVacancyCategory }
