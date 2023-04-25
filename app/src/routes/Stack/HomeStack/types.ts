import { PostCollection, PostType } from '../../../services/firebase/types'
import { SearchParams } from '../../../services/maps/types'
import { UserStackParamList } from '../UserStack/types'

export type HomeStackParamList = {
	Home: { userId?: string }
	ViewServicePostHome: { postData: PostCollection }
	ViewSalePostHome: { postData: PostCollection }
	ViewVacancyPostHome: { postData: PostCollection }
	ViewSocialImpactPostHome: { postData: PostCollection }
	ViewCulturePostHome: { postData: PostCollection }
	PostCategories: { postType: PostType }
	PostCategoryDetails: undefined
	ViewAllTags: undefined
	ViewPostsByTag: { currentTagSelected: string }
	SearchResult: { searchParams: SearchParams, categoryLabel?: string }
	ProfileHome: { userId: string, stackLabel: string }
} & UserStackParamList
