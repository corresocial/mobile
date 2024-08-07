import { PostEntity } from '@domain/post/entity/types'
import { UserEntity } from '@domain/user/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type LeaderAreaStackParamList = {
	LeaderAreaHome: undefined
	PollPetitionArea: undefined
	ViewPollList: undefined
	ViewPetitionList: undefined

	ViewUnapprovedPost: { postData: PostEntity }
	ViewUnapprovedProfile: { profileData: UserEntity }
	PostViewLeaderArea: { postData: PostEntity, redirectedPostId: string }
	ViewUnapprovedRegistersList: undefined

	ProfileLeaderArea: { userId: string, stackLabel?: string }
	PostViewHome: { postData: PostEntity, redirectedPostId: string }
	SearchProfile: undefined
	CitizenRegistrationArea: undefined
} & UserStackParamList
