import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { PostCategoriesType, ServiceCategories } from '@domain/post/entity/types'

import { ServiceContext } from '@contexts/ServiceContext'

import { SelectServiceCategoryScreenProps } from '@routes/Stack/ServiceStack/screenProps'

import { serviceCategories } from '@utils/postsCategories/serviceCategories'

import { theme } from '@common/theme'

import { PostCategory } from '@components/_onboarding/PostCategory'

type GenericSelectPostCategoryType = (category: PostCategoriesType) => void

function SelectServiceCategory({ route, navigation }: SelectServiceCategoryScreenProps) {
	const { isSecondPost, setServiceDataOnContext } = useContext(ServiceContext)

	const onSelectCategory = (categoryName: ServiceCategories) => {
		setServiceDataOnContext({ category: categoryName })
		navigation.navigate('SelectServiceTags', { categorySelected: categoryName, ...route.params })
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostCategory
				backgroundColor={theme.green2}
				categories={serviceCategories}
				progress={[2, isSecondPost ? 3 : 5]}
				navigateBackwards={() => navigation.goBack()}
				savePostCategory={onSelectCategory as GenericSelectPostCategoryType}
			/>
		</>
	)
}

export { SelectServiceCategory }
