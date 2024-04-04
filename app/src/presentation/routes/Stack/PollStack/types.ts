import { PollEntity } from '@domain/poll/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type PollStackParamList = {
	InsertPollTitle: { editMode: boolean } | undefined
	InsertPollDescription: { editMode: boolean } | undefined
	InsertPollQuestions: undefined
	SelectPollQuestionType: undefined
	SelectPollRange: undefined
	InsertPollLocation: undefined
	EditPoll: { pollData: PollEntity, unsavedPoll: boolean }
} & UserStackParamList
