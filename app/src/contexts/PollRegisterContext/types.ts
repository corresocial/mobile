import { ReactNode } from 'react'

import { PollEntity, PollEntityOptional, PollQuestion, PollQuestionOptional, PollResponse } from '@domain/poll/entity/types'

export interface PollRegisterProviderProps {
	children: ReactNode
}

export type PollRegisterContextType = {
	pollRegisterDataContext: PollEntity
	setPollDataOnContext: (data: PollEntityOptional) => void

	setPollQuestionRegisterDataOnContext: (data: PollQuestionOptional) => void,
	setRegisteredQuestionOnPollDataContext: (questionType: PollQuestion['questionType']) => void
	removeQuestionFromRegisterContext: (questionId: string) => void

	saveUnrespondedQuestions: (questions: PollQuestion[]) => void
	getNextQuestion: (lastQuestion: PollQuestion) => PollQuestion | null
	pollResponseData: PollResponse[]
	saveResponseData: (question: PollQuestion, response: string | number | boolean) => void
}
