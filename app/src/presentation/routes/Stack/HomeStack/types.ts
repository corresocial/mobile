import { PostCollection, PostCollectionRemote, PostRange, PostType } from '@services/firebase/types'
import { SearchParams } from '@services/googleMaps/types/maps'

export type HomeStackParamList = {
	Home: { userId?: string }

	ViewIncomePostHome: { postData: PostCollection }
	ViewVacancyPostHome: { postData: PostCollection }
	ViewSocialImpactPostHome: { postData: PostCollection }
	ViewCulturePostHome: { postData: PostCollection }

	PostCategories: undefined
	ViewPostsByPostType: { postType: PostType }
	PostCategoryDetails: undefined
	ViewAllCategories: undefined
	ViewAllTags: undefined
	ViewPostsByTag: { currentTagSelected: string }
	ViewPostsByRange: { postsByRange: PostCollectionRemote[], postRange: PostRange | '', postType?: PostType, searchByRange?: boolean }
	SearchResult: { searchParams: SearchParams, categoryLabel?: string, searchByRange?: boolean }
	ProfileHome: { userId: string, stackLabel?: string }

	PublicServicesStack: undefined
}
