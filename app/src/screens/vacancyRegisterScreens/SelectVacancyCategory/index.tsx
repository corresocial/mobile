import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { vacancyCategories } from '../../../utils/postsCategories/vacancyCategories'

import { SelectVacancyCategoryScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { VacancyCategories } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { PostCategory } from '../../../components/_onboarding/PostCategory'

function SelectVacancyCategory({ route, navigation }: SelectVacancyCategoryScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	const onSelectCategory = (categoryName: VacancyCategories) => {
		setVacancyDataOnContext({
			category: categoryName
		})
		navigation.navigate('SelectVacancyTags', { categorySelected: categoryName, ...route.params })
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.yellow2}
				categories={vacancyCategories}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory}
				progress={[1, 5]}
			/>
		</>
	)
}

export { SelectVacancyCategory }
