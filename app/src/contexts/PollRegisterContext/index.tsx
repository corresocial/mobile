import React, { createContext, useContext, useMemo, useState } from 'react'
import uuid from 'react-uuid'

import { PollEntity, PollEntityOptional, PollQuestion, PollQuestionOptional, PollResponse } from '@domain/poll/entity/types'

import { PollRegisterContextType, PollRegisterProviderProps } from './types'

const initialValue: PollRegisterContextType = {
	pollRegisterDataContext: {
		range: 'near',
		pollId: '',
		title: '',
		description: '',
		createdAt: new Date(),
		questions: [],
		location: {
			coordinates: {
				latitude: 0,
				longitude: 0
			},
			geohashNearby: []
		} as any,
		owner: {
			name: '',
			userId: ''
		}
	} as PollEntity,
	setPollDataOnContext: (data: PollEntityOptional) => { },
	setPollQuestionRegisterDataOnContext: (data: PollQuestionOptional) => { },
	setRegisteredQuestionOnPollDataContext: (questionType: PollQuestion['questionType']) => { },
	removeQuestionFromRegisterContext: (questionId: string) => { },

	savePollToRespondOnContext: (currentPoll: PollEntity) => { },
	getNextQuestion: (lastQuestion: PollQuestion) => ({} as PollQuestion),
	pollToRespond: { questions: [] as PollQuestion[] } as PollEntity,
	pollResponseData: [{
		questionId: '',
		response: '' as string | number | boolean,
		questionType: 'textual' as PollQuestion['questionType']
	}],
	saveResponseData: (question: PollQuestion, response: string | number | boolean) => { }
}

const PollRegisterContext = createContext<PollRegisterContextType>(initialValue)

function PollRegisterProvider({ children }: PollRegisterProviderProps) {
	const [pollRegisterDataContext, setPollRegisterDataContext] = useState(initialValue.pollRegisterDataContext)
	const [pollQuestionRegisterDataContext, setPollQuestionRegisterDataContext] = useState<PollQuestion>({} as PollQuestion)

	const [pollToRespond, setPollToRespond] = useState<PollEntity>(initialValue.pollToRespond)
	const [pollResponseData, setPollResponseData] = useState<PollResponse[]>([])

	const setPollDataOnContext = async (data: PollEntityOptional) => {
		console.log({ ...pollRegisterDataContext, ...data })
		setPollRegisterDataContext({ ...pollRegisterDataContext, ...data })
	}

	const setPollQuestionRegisterDataOnContext = async (data: PollQuestionOptional) => {
		console.log({ ...pollQuestionRegisterDataContext, ...data })
		setPollQuestionRegisterDataContext({ ...pollQuestionRegisterDataContext, ...data })
	}

	const setRegisteredQuestionOnPollDataContext = (questionType: PollQuestion['questionType']) => {
		const newQuestion: PollQuestion = {
			questionId: uuid(),
			question: pollQuestionRegisterDataContext.question,
			questionType
		}

		setPollDataOnContext({ questions: [...pollRegisterDataContext.questions, newQuestion] })
		clearPollRegisterQuestionData()
	}

	const clearPollRegisterQuestionData = () => {
		setPollQuestionRegisterDataContext({} as PollQuestion)
	}

	const removeQuestionFromRegisterContext = (questionId: string) => {
		const pollRegisterDataContextQuestions = pollRegisterDataContext.questions.filter((question) => question.questionId !== questionId)
		setPollRegisterDataContext({ ...pollRegisterDataContext, questions: pollRegisterDataContextQuestions })
	}

	const savePollToRespondOnContext = (currentPoll: PollEntity) => {
		setPollToRespond(currentPoll)
		setPollResponseData([])
	}

	// Está recebendo como parâmetro porque chamar os 2 métodos não estava dando tempo de atualizar o state
	const getNextQuestion = (lastQuestion: PollQuestion) => {
		const lastQuestionId = lastQuestion ? [lastQuestion.questionId] : []

		const respondedQuestions = [...pollResponseData.map((poll) => poll.questionId), ...lastQuestionId]

		const unrespondedQuestions = pollToRespond.questions.filter((question) => !respondedQuestions.includes(question.questionId))

		if (unrespondedQuestions.length === 0) return null
		return unrespondedQuestions[0]
	}

	const saveResponseData = (question: PollQuestion, response: string | number | boolean) => {
		const pollData: PollResponse = {
			questionId: question.questionId,
			response,
			questionType: question.questionType
		}

		if (pollResponseData.find((poll) => poll.questionId === question.questionId)) {
			return setPollResponseData(pollResponseData.map((poll) => (poll.questionId === question.questionId ? pollData : poll)))
		}

		setPollResponseData([...pollResponseData, pollData])
	}

	const pollProviderData = useMemo(() => ({
		pollRegisterDataContext,

		setPollDataOnContext,
		setPollQuestionRegisterDataOnContext,
		setRegisteredQuestionOnPollDataContext,
		removeQuestionFromRegisterContext,

		pollToRespond,
		pollResponseData,
		savePollToRespondOnContext,
		getNextQuestion,
		saveResponseData
	}), [
		pollRegisterDataContext,
		pollQuestionRegisterDataContext,
		pollToRespond,
		pollResponseData
	])

	return (
		<PollRegisterContext.Provider value={pollProviderData}>
			{children}
		</PollRegisterContext.Provider>
	)
}

const usePollRegisterContext = () => useContext(PollRegisterContext)
export { usePollRegisterContext }

export { PollRegisterProvider, PollRegisterContext }
