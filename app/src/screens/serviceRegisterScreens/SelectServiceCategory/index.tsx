import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { serviceCategories } from '../../../utils/postsCategories/serviceCategories'

import { SelectServiceCategoryScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { ServiceCategories } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { PostCategory } from '../../../components/_onboarding/PostCategory'

function SelectServiceCategory({ route, navigation }: SelectServiceCategoryScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

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
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory}
				progress={[1, 5]}
			/>
		</>
	)
}

export { SelectServiceCategory }
