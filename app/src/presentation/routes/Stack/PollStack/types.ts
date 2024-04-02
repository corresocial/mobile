import { UserStackParamList } from '../UserStack/types'

export type PollStackParamList = {
	InsertPollDescription: { editMode: boolean } | undefined
} & UserStackParamList
