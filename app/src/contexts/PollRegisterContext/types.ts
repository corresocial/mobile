import { ReactNode } from 'react'

import { PollEntity, PollEntityOptional, PollQuestion, PollQuestionOptional, PollResponse } from '@domain/poll/entity/types'

export interface PollRegisterProviderProps {
	children: ReactNode
}

export type PollRegisterContextType = {
	pollRegisterDataContext: PollEntity
	setPollDataOnContext: (data: PollEntityOptional) => void

	setPollQuestionRegisterDataOnContext: (data: PollQuestionOptional) => void,
	setRegisteredQuestionOnPollDataContext: (questionType: PollQuestion['questionType'], options?: string[], multiSelect?: boolean) => void
	removeQuestionFromRegisterContext: (questionId: string) => void

	pollToRespond: PollEntity,
	pollResponseData: PollResponse[]
	savePollToRespondOnContext: (currentPoll: PollEntity) => void
	getResponseProgress: (currentQuestionId: string | number) => number[]
	getNextQuestion: (lastQuestion: PollQuestion) => PollQuestion | null
	saveResponseData: (question: PollQuestion, response: string | string[] | number | boolean) => void
}
