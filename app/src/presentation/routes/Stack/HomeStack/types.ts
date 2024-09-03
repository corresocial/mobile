import { PostEntity, PostRange, PostType } from '@domain/post/entity/types'
import { SocialMedia } from '@domain/user/entity/types'

import { UserStackParamList } from '../UserStack/types'
import { FeedSearchParams } from '@services/cloudFunctions/types/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

export type HomeStackParamList = {
	Home: { userId?: string, scrollToTop?(): void }
	ViewPostsByRange: { postsByRange: PostEntity[], postRange: PostRange | '', postType?: PostType, searchByRange?: boolean, collapseExternalVacancies?: boolean }
	ViewPostsByPostType: { postType: PostType }
	ViewPostsByMacroCategory: undefined | { postType: PostType, macroCategory: MacroCategoriesType }
	EventsCalendar: undefined
	SearchResult: { searchParams: Partial<FeedSearchParams>, categoryLabel?: string, searchByRange?: boolean }

	ProfileHome: { userId: string, stackLabel?: string }
	PostViewHome: { postData: PostEntity, redirectedPostId: string }
	SocialMediaManagementHome: { socialMedias?: SocialMedia[], isAuthor?: boolean }

	PublicServicesStack: undefined
} & UserStackParamList
