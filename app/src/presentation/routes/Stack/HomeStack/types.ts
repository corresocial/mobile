import { PostEntity, PostRange, PostType } from '@domain/post/entity/types'
import { SocialMedia } from '@domain/user/entity/types'

import { UserStackParamList } from '../UserStack/types'
import { FeedSearchParams } from '@services/cloudFunctions/types/types'

export type HomeStackParamList = {
	Home: { userId?: string }

	PostViewHome: { postData: PostEntity, redirectedPostId: string }

	PostCategories: undefined
	ViewPostsByPostType: { postType: PostType }
	PostCategoryDetails: undefined
	ViewAllCategories: undefined
	ViewAllTags: undefined
	ViewPostsByTag: { currentTagSelected: string }
	ViewPostsByRange: { postsByRange: PostEntity[], postRange: PostRange | '', postType?: PostType, searchByRange?: boolean }
	SearchResult: { searchParams: Partial<FeedSearchParams>, categoryLabel?: string, searchByRange?: boolean }
	EventsCalendar: undefined

	ProfileHome: { userId: string, stackLabel?: string }
	SocialMediaManagementHome: { socialMedias?: SocialMedia[], isAuthor?: boolean }

	PublicServicesStack: undefined
} & UserStackParamList
