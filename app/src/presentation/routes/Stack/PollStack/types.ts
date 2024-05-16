import { PollEntity, PollQuestion } from '@domain/poll/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type PollStackParamList = {
	InsertPollTitle: { editMode: boolean, initialValue: string } | undefined
	InsertPollDescription: { editMode: boolean, initialValue: string } | undefined
	InsertPollQuestions: { editMode: boolean, initialValue: PollEntity['questions'] | null } | undefined
	SelectPollQuestionType: { editMode: boolean, questionText: string } | undefined
	SelectNumberOfSelections: { editMode: boolean, selectOptions: string[], questionText?: string }
	InsertPollSelectOptions: { editMode: boolean, selectOptions: string[], multiSelect: boolean, questionText?: string }
	SelectPollRange: { editMode: boolean, initialValue: PollEntity['range'] } | undefined
	InsertPollLocation: { editMode: boolean, initialValue: PollEntity['location'] } | undefined

	PollReview: { pollData: PollEntity, unsavedPoll: boolean }
	ViewPoll: { pollId: string, pollData?: PollEntity }

	AnswerSatisfactionQuestion: { questionData: PollQuestion }
	AnswerBinaryQuestion: { questionData: PollQuestion }
	AnswerTextualQuestion: { questionData: PollQuestion }
	AnswerSelectQuestion: { questionData: PollQuestion }
	FinishedPollResponse: undefined
} & UserStackParamList
