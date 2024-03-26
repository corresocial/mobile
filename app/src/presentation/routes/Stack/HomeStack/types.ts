import { PostCollection, PostCollectionRemote, PostRange, PostType } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'
import { FeedSearchParams } from '@services/cloudFunctions/types/types'

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
	SearchResult: { searchParams: Partial<FeedSearchParams>, categoryLabel?: string, searchByRange?: boolean }
	ProfileHome: { userId: string, stackLabel?: string }

	PublicServicesStack: undefined
} & UserStackParamList
