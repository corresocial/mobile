import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { serviceCategories, updateServiceTags } from '../../../utils/postsCategories/serviceCategories'

import { SelectServiceTagsScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../../contexts/ServiceContext'
import { EditContext } from '../../../../contexts/EditContext'

import { PostTags } from '../../../components/_onboarding/PostTags'

function SelectServiceTags({ route, navigation }: SelectServiceTagsScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const getServiceCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const addNewTag = (tagName: string) => {
		updateServiceTags(getServiceCategorySelected(), tagName)
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

		setServiceDataOnContext({
			tags: tagsSelected
		})
		navigation.navigate('InsertServiceDescription')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostTags
				backgroundColor={theme.green2}
				lightColor={theme.green1}
				currentCategory={serviceCategories[getServiceCategorySelected()]}
				navigateBackwards={() => navigation.goBack()}
				addNewTag={addNewTag}
				savePostTags={saveTags}
			/>
		</>
	)
}

export { SelectServiceTags }
