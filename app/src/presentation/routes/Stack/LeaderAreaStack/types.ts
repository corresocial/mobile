import { CultureEntity, IncomeEntity, PostEntity, SocialImpactEntity, VacancyEntity } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type LeaderAreaStackParamList = {
	LeaderAreaHome: undefined
	PollPetitionArea: undefined
	ViewPollList: undefined
	ViewPetitionList: undefined

	ViewUnapprovedPost: { postData: PostEntity }
	ViewUnapprovedRegistersList: undefined

	ProfileLeaderArea: { userId: string, stackLabel?: string }
	ViewIncomePostLeaderArea: { postData: IncomeEntity, redirectedPostId: string }
	ViewVacancyPostLeaderArea: { postData: VacancyEntity, redirectedPostId: string }
	ViewSocialImpactPostLeaderArea: { postData: SocialImpactEntity, redirectedPostId: string }
	ViewCulturePostLeaderArea: { postData: CultureEntity, redirectedPostId: string }
} & UserStackParamList
