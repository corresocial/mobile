import { PollEntity } from '@domain/poll/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type PollStackParamList = {
	InsertPollTitle: { editMode: boolean, initialValue: string } | undefined
	InsertPollDescription: { editMode: boolean, initialValue: string } | undefined
	InsertPollQuestions: undefined
	SelectPollQuestionType: undefined
	SelectPollRange: { editMode: boolean, initialValue: PollEntity['range'] } | undefined
	InsertPollLocation: { editMode: boolean, initialValue: PollEntity['location'] } | undefined
	PollReview: { pollData: PollEntity, unsavedPoll: boolean }
} & UserStackParamList
