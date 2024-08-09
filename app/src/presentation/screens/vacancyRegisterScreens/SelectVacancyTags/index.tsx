import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { VacancyContext } from '@contexts/VacancyContext'

import { SelectVacancyTagsScreenProps } from '@routes/Stack/VacancyStack/screenProps'

import { vacancyCategories, updateVacancyTags } from '@utils/postsCategories/vacancyCategories'

import { theme } from '@common/theme'

import { PostTags } from '@components/_onboarding/PostTags'

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
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.colors.green[2]}
				lightColor={theme.colors.green[1]}
				currentCategory={vacancyCategories[getVacancyCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectVacancyTags }
