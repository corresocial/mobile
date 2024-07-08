import { PostEntity, PostRange, PostType, CultureEntity, VacancyEntity, SocialImpactEntity, IncomeEntity } from '@domain/post/entity/types'
import { SocialMedia } from '@domain/user/entity/types'

import { UserStackParamList } from '../UserStack/types'
import { FeedSearchParams } from '@services/cloudFunctions/types/types'

export type HomeStackParamList = {
	Home: { userId?: string }

	ViewIncomePostHome: { postData: IncomeEntity, redirectedPostId: string }
	ViewVacancyPostHome: { postData: VacancyEntity, redirectedPostId: string }
	ViewSocialImpactPostHome: { postData: SocialImpactEntity, redirectedPostId: string }
	ViewCulturePostHome: { postData: CultureEntity, redirectedPostId: string }

	PostCategories: undefined
	ViewPostsByPostType: { postType: PostType }
	PostCategoryDetails: undefined
	ViewAllCategories: undefined
	ViewAllTags: undefined
	ViewPostsByTag: { currentTagSelected: string }
	ViewPostsByRange: { postsByRange: PostEntity[], postRange: PostRange | '', postType?: PostType, searchByRange?: boolean }
	SearchResult: { searchParams: Partial<FeedSearchParams>, categoryLabel?: string, searchByRange?: boolean }

	ProfileHome: { userId: string, stackLabel?: string }
	SocialMediaManagementHome: { socialMedias?: SocialMedia[], isAuthor?: boolean }

	PublicServicesStack: undefined
} & UserStackParamList
