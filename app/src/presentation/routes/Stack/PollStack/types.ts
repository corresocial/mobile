import { UserStackParamList } from '../UserStack/types'

export type PollStackParamList = {
	InsertPollTitle: { editMode: boolean } | undefined
	InsertPollDescription: { editMode: boolean } | undefined
	InsertPollQuestions: undefined
	SelectPollQuestionType: undefined
	SelectPollRange: undefined
	InsertPollLocation: undefined
} & UserStackParamList
