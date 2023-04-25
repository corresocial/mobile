import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { vacancyCategories, updateVacancyTags } from '../../../utils/postsCategories/vacancyCategories'

import { SelectVacancyTagsScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostTags } from '../../../components/_onboarding/PostTags'

function SelectVacancyTags({ route, navigation }: SelectVacancyTagsScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const getVacancyCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const addNewTag = (tagName: string) => {
		updateVacancyTags(getVacancyCategorySelected(), tagName)
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

		setVacancyDataOnContext({
			tags: tagsSelected
		})
		navigation.navigate('InsertVacancyTitle')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.yellow2}
				lightColor={theme.yellow1}
				currentCategory={vacancyCategories[getVacancyCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectVacancyTags }
