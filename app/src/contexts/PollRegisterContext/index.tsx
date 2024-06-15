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
		},
	} as PollEntity,
	setPollDataOnContext: (data: PollEntityOptional) => { },
	setPollQuestionRegisterDataOnContext: (data: PollQuestionOptional) => { },
	setRegisteredQuestionOnPollDataContext: (questionType: PollQuestion['questionType'], options?: string[], multiSelect?: boolean) => { },
	removeQuestionFromRegisterContext: (questionId: string) => { },

	savePollToRespondOnContext: (currentPoll: PollEntity) => { },
	getResponseProgess: (currentQuestionId: string | number) => [0, 1],
	getNextQuestion: (lastQuestion: PollQuestion) => ({} as PollQuestion),
	pollToRespond: { questions: [] as PollQuestion[] } as PollEntity,
	pollResponseData: [{
		questionId: '',
		response: '' as string[] | string | number | boolean,
		questionType: 'textual' as PollQuestion['questionType']
	}],
	saveResponseData: (question: PollQuestion, response: string | string[] | number | boolean) => { }
}

const PollRegisterContext = createContext<PollRegisterContextType>(initialValue)

function PollRegisterProvider({ children }: PollRegisterProviderProps) {
	const [pollRegisterDataContext, setPollRegisterDataContext] = useState(initialValue.pollRegisterDataContext)
	const [pollQuestionRegisterDataContext, setPollQuestionRegisterDataContext] = useState<PollQuestion>({} as PollQuestion)

	const [pollToRespond, setPollToRespond] = useState<PollEntity>(initialValue.pollToRespond)
	const [pollResponseData, setPollResponseData] = useState<PollResponse[]>([])

	const setPollDataOnContext = async (data: PollEntityOptional) => {
		// console.log({ ...pollRegisterDataContext, ...data })
		setPollRegisterDataContext({ ...pollRegisterDataContext, ...data })
	}

	const setPollQuestionRegisterDataOnContext = async (data: PollQuestionOptional) => {
		console.log({ ...pollQuestionRegisterDataContext, ...data })
		setPollQuestionRegisterDataContext({ ...pollQuestionRegisterDataContext, ...data })
	}

	const setRegisteredQuestionOnPollDataContext = (questionType: PollQuestion['questionType'], options?: string[], multiSelect?: boolean) => {
		const selectOptions = options ? { options, multiSelect: !!multiSelect } : {}
		const newQuestion: PollQuestion = {
			questionId: uuid(),
			question: pollQuestionRegisterDataContext.question,
			questionType,
			...selectOptions
		}
		console.log(newQuestion)

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

		const pollResponseMapper = currentPoll.questions.map((question) => {
			return {
				questionId: question.questionId,
				response: '',
				questionType: question.questionType
			}
		})
		setPollResponseData(pollResponseMapper)
	}

	const getResponseProgess = (currentQuestionId: string | number) => {
		const numberOfResponses = pollResponseData.length
		const currentQuestionIndex = pollResponseData.findIndex(({ questionId }) => questionId === currentQuestionId)
		return [numberOfResponses - (numberOfResponses - currentQuestionIndex) + 1, numberOfResponses]
	}

	const getNextQuestion = (lastQuestion: PollQuestion) => {
		const lastQuestionId = lastQuestion ? lastQuestion.questionId : ''
		const currentQuestionIndex = pollResponseData.findIndex(({ questionId }) => questionId === lastQuestionId)
		const nextIndex = currentQuestionIndex + 1
		if (nextIndex >= pollResponseData.length) return null
		return pollToRespond.questions[nextIndex]
	}

	const saveResponseData = (question: PollQuestion, response: string | string[] | number | boolean) => {
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
		getResponseProgess,
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

export { PollRegisterProvider, usePollRegisterContext }
