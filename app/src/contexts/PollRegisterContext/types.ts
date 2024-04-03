import { ReactNode } from 'react'

import { PollEntity, PollEntityOptional, PollQuestion, PollQuestionOptional } from '@domain/poll/entity/types'

export interface PollRegisterProviderProps {
	children: ReactNode
}

export type PollRegisterContextType = {
	pollDataContext: PollEntity
	setPollDataOnContext: (data: PollEntityOptional) => void
	setCurrentPollQuestionDataOnContext: (data: PollQuestionOptional) => void,
	setCurrentQuestionOnPollDataContext: (questionType: PollQuestion['questionType']) => void
	removeQuestionFromRegisterContext: (questionId: string) => void
}
