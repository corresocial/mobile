import React from 'react'
import { SvgProps } from 'react-native-svg'
import { PostCollection, PostCollectionType, PostType, SaleCategories } from '../../../services/firebase/types'

export type HomeStackParamList = {
	Home: { userId?: string }
	ViewServicePostHome: { postData: PostCollection }
	ViewSalePostHome: { postData: PostCollection }
	ViewVacancyPostHome: { postData: PostCollection }
	ViewSocialImpactPostHome: { postData: PostCollection }
	ViewCulturePostHome: { postData: PostCollection }
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
