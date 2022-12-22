import React from 'react'
import { SvgProps } from 'react-native-svg'
import { PostCollection, PostCollectionType, PostType, SaleCategories } from '../../../services/firebase/types'

export type HomeStackParamList = {
	Home: { userId?: string }
	ViewServicePostHome: { postData: PostCollection, isAuthor: boolean }
	ViewSalePostHome: { postData: PostCollection, isAuthor: boolean }
	ViewVacancyPostHome: { postData: PostCollection, isAuthor: boolean }
	ViewSocialImpactPostHome: { postData: PostCollection, isAuthor: boolean }
	ViewCulturePostHome: { postData: PostCollection, isAuthor: boolean }
	PostCategories: { title: string }
	PostCategoryDetails: {
		backgroundColor: string
		title: string
		categoryName: string
		cagegoryIcon: React.FC<SvgProps>
		categoryType: PostType
		categoryCollection: PostCollectionType
		categoryTags: string[]
	}
	ViewAllTags: {
		backgroundColor: string
		title: string
		categoryName: string
		cagegoryIcon: React.FC<SvgProps>
		categoryType: PostType
		categoryCollection: PostCollectionType
		categoryTags: string[]
	}
	ViewPostsByTag: {
		backgroundColor: string
		tagName: string
		cagegoryIcon: React.FC<SvgProps>
		categoryType: PostType
		categoryCollection: PostCollectionType
	}
}
