import React, { createContext, useContext, useMemo, useState } from 'react'

import { CitizenRegisterQuestionary, CitizenRegisterQuestion, CitizenRegisterResponse } from '@domain/citizenRegister/model/entities/types'

import { CitizenRegistrationContextType, CitizenRegistrationProviderProps } from './types'

import { citizenRegisterData } from './citizenRegisterData'

const CitizenRegistrationContext = createContext<CitizenRegistrationContextType>({} as any)

function CitizenRegistrationProvider({ children }: CitizenRegistrationProviderProps) {
	const [citizenRegistrationQuestionToRespond, setCitizenRegistrationQuestionToRespond] = useState<CitizenRegisterQuestionary>({} as any)
	const [citizenRegistrationResponseData, setCitizenRegistrationResponseData] = useState<CitizenRegisterResponse[]>([])

	const startNewCitizenRegistration = () => {
		setCitizenRegistrationQuestionToRespond(citizenRegisterData)

		const citizenRegisterResponseMapper = citizenRegisterData.questions.map((question) => {
			return {
				questionId: question.questionId,
				response: '',
				questionType: question.questionType
			}
		}) as CitizenRegisterResponse[] // CURRENT Definir novas variáveis para construir o objeto no contexto

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

	const saveResponseData = (question: CitizenRegisterQuestion, response: CitizenRegisterResponse) => {
		const registerData: CitizenRegisterResponse = {
			...question,
			questionId: question.questionId,
			question: question.question,
			questionType: question.questionType,
		} as CitizenRegisterResponse

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
