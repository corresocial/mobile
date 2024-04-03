import React, { createContext, useMemo, useState } from 'react'
import uuid from 'react-uuid'

import { PollEntity, PollEntityOptional, PollQuestion, PollQuestionOptional } from '@domain/poll/entity/types'

import { PollRegisterContextType, PollRegisterProviderProps } from './types'

const initialValue: PollRegisterContextType = {
	pollDataContext: {
		pollId: '',
		title: '',
		description: '',
		questions: []
	} as PollEntity,
	setPollDataOnContext: (data: PollEntityOptional) => { },
	setCurrentPollQuestionDataOnContext: (data: PollQuestionOptional) => { },
	setCurrentQuestionOnPollDataContext: (questionType: PollQuestion['questionType']) => { },
	removeQuestionFromRegisterContext: (questionId: string) => { }
}

const PollRegisterContext = createContext<PollRegisterContextType>(initialValue)

function PollRegisterProvider({ children }: PollRegisterProviderProps) {
	const [pollDataContext, setPollDataContext] = useState(initialValue.pollDataContext)
	const [currentPollQuestionDataContext, setCurrentPollQuestionDataContext] = useState<PollQuestion>({} as PollQuestion)

	const setPollDataOnContext = async (data: PollEntityOptional) => {
		console.log({ ...pollDataContext, ...data })
		setPollDataContext({ ...pollDataContext, ...data })
	}

	const setCurrentPollQuestionDataOnContext = async (data: PollQuestionOptional) => {
		console.log({ ...currentPollQuestionDataContext, ...data })
		setCurrentPollQuestionDataContext({ ...currentPollQuestionDataContext, ...data })
	}

	const setCurrentQuestionOnPollDataContext = (questionType: PollQuestion['questionType']) => {
		const newQuestion: PollQuestion = {
			questionId: uuid(),
			question: currentPollQuestionDataContext.question,
			questionType
		}
		console.log(pollDataContext)
		console.log(currentPollQuestionDataContext)

		setPollDataOnContext({ questions: [...pollDataContext.questions, newQuestion] })
		clearCurrentPollQuestionData()
	}

	const clearCurrentPollQuestionData = () => {
		setCurrentPollQuestionDataContext({} as PollQuestion)
	}

	const removeQuestionFromRegisterContext = (questionId: string) => {
		const pollDataContextQuestions = pollDataContext.questions.filter((question) => question.questionId !== questionId)
		setPollDataContext({ ...pollDataContext, questions: pollDataContextQuestions })
	}

	const pollProviderData = useMemo(() => ({
		pollDataContext,
		setPollDataOnContext,
		setCurrentPollQuestionDataOnContext,
		setCurrentQuestionOnPollDataContext,
		removeQuestionFromRegisterContext
	}), [pollDataContext, currentPollQuestionDataContext])

	return (
		<PollRegisterContext.Provider value={pollProviderData}>
			{children}
		</PollRegisterContext.Provider>
	)
}

export { PollRegisterProvider, PollRegisterContext }
