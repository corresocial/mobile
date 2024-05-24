import { PostEntity } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type LeaderAreaStackParamList = {
	LeaderAreaHome: undefined
	PollPetitionArea: undefined
	ViewPollList: undefined
	ViewPetitionList: undefined

	ViewUnapprovedPost: { postData: PostEntity }
} & UserStackParamList
