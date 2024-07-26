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
	ViewUnapprovedRegistersList: undefined

	ProfileLeaderArea: { userId: string, stackLabel?: string }
	CitizenRegistrationArea: undefined
} & UserStackParamList
