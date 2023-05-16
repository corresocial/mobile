import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { serviceCategories } from '../../../utils/postsCategories/serviceCategories'

import { SelectServiceCategoryScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { ServiceCategories } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { PostCategory } from '../../../components/_onboarding/PostCategory'

function SelectServiceCategory({ route, navigation }: SelectServiceCategoryScreenProps) {
	const { isSecondPost, setServiceDataOnContext, getAditionalDataFromLastPost } = useContext(ServiceContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	const onSelectCategory = (categoryName: ServiceCategories) => {
		setServiceDataOnContext({ category: categoryName })
		navigation.navigate('SelectServiceTags', { categorySelected: categoryName, ...route.params })
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.purple2}
				categories={serviceCategories}
				progress={[1, isSecondPost ? 3 : 5]}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory}
			/>
		</>
	)
}

export { SelectServiceCategory }
