import React, { createContext, useContext, useMemo, useState } from 'react'

import { CitizenRegisterQuestionary, CitizenRegisterQuestion, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { CitizenRegistrationContextType, CitizenRegistrationProviderProps } from './types'

import { citizenRegisterData } from './citizenRegisterData'

const CitizenRegistrationContext = createContext<CitizenRegistrationContextType>({} as CitizenRegistrationContextType)

function CitizenRegistrationProvider({ children }: CitizenRegistrationProviderProps) {
	const [citizenRegistrationQuestionToRespond, setCitizenRegistrationQuestionToRespond] = useState<CitizenRegisterQuestionary>({} as any)
	const [citizenRegistrationResponseData, setCitizenRegistrationResponseData] = useState<CitizenRegisterQuestionResponse[]>([])

	const startNewCitizenRegistration = () => {
		setCitizenRegistrationQuestionToRespond(citizenRegisterData)

		const citizenRegisterResponseMapper = citizenRegisterData.questions.map((question) => {
			return {
				...question,
				response: ''
			}
		}) as CitizenRegisterQuestionResponse[]

		setCitizenRegistrationResponseData(citizenRegisterResponseMapper)
	}

	const getNextQuestion = (lastQuestion: CitizenRegisterQuestion) => {
		const lastQuestionId = lastQuestion ? lastQuestion.questionId : ''
		const currentQuestionIndex = citizenRegistrationResponseData.findIndex(({ questionId }) => questionId === lastQuestionId)
		const nextIndex = currentQuestionIndex + 1
		if (nextIndex >= citizenRegistrationResponseData.length) return null
		console.log(citizenRegistrationQuestionToRespond.questions[nextIndex])
		return citizenRegistrationQuestionToRespond.questions[nextIndex]
	}

	const getResponseProgress = (currentQuestionId: string | number) => {
		const numberOfResponses = citizenRegistrationResponseData.length
		const currentQuestionIndex = citizenRegistrationResponseData.findIndex(({ questionId }) => questionId === currentQuestionId)
		return [numberOfResponses - (numberOfResponses - currentQuestionIndex), numberOfResponses]
	}

	const saveResponseData = (question: CitizenRegisterQuestion, response: CitizenRegisterQuestionResponse['response']) => {
		const registerData: CitizenRegisterQuestionResponse = {
			...question,
			response: response
		} as CitizenRegisterQuestionResponse

		console.log(registerData)

		if (citizenRegistrationResponseData.find((citizenRegister) => citizenRegister.questionId === question.questionId)) {
			return setCitizenRegistrationResponseData(citizenRegistrationResponseData.map((citizenRegister) => (citizenRegister.questionId === question.questionId ? registerData : citizenRegister)))
		}

		setCitizenRegistrationResponseData([...citizenRegistrationResponseData, registerData])
	}

	const CitizenProviderData = useMemo(() => ({
		citizenRegistrationQuestionToRespond,
		citizenRegistrationResponseData,
		startNewCitizenRegistration,
		getNextQuestion,
		getResponseProgress,
		saveResponseData
	}

	), [citizenRegistrationResponseData, citizenRegistrationQuestionToRespond])

	return (
		<CitizenRegistrationContext.Provider value={CitizenProviderData}>
			{children}
		</CitizenRegistrationContext.Provider>
	)
}

const useCitizenRegistrationContext = () => useContext(CitizenRegistrationContext)

export { CitizenRegistrationProvider, useCitizenRegistrationContext }
