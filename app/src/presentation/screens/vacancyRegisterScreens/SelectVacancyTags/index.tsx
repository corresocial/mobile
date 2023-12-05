import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { VacancyContext } from '@contexts/VacancyContext'

import { theme } from '@common/theme'

import { PostTags } from '@components/_onboarding/PostTags'

import { SelectVacancyTagsScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { vacancyCategories, updateVacancyTags } from '../../../utils/postsCategories/vacancyCategories'

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
		navigation.navigate('InsertVacancyDescription')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.green2}
				lightColor={theme.green1}
				currentCategory={vacancyCategories[getVacancyCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectVacancyTags }
