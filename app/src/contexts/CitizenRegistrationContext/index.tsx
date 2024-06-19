import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'
import { CitizenRegisterQuestion, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { CitizenRegistrationContextType, CitizenRegistrationIdentifier, CitizenRegistrationProviderProps } from './types'

const CitizenRegistrationContext = createContext<CitizenRegistrationContextType>({} as CitizenRegistrationContextType)

const citizenUseCases = new CitizenRegisterUseCases()

const initialCitizenRegisterIdentifier: CitizenRegistrationIdentifier = {
	cellNumber: '',
	name: '',
	citizenHasAccount: false
}

function CitizenRegistrationProvider({ children }: CitizenRegistrationProviderProps) {
	const [citizenRegistrationQuestionToRespond, setCitizenRegistrationQuestionToRespond] = useState<CitizenRegisterQuestionResponse[]>({} as any)
	const [citizenRegistrationResponseData, setCitizenRegistrationResponseData] = useState<CitizenRegisterQuestionResponse[]>([])
	const [citizenRegistrationIdentifier, setCitizenRegistrationIdentifier] = useState<CitizenRegistrationIdentifier>(initialCitizenRegisterIdentifier)

	const startNewCitizenRegistration = () => {
		const citizenRegistrationQuestionary = citizenUseCases.getCitizenRegistrationQuestionary()
		setCitizenRegistrationQuestionToRespond(citizenRegistrationQuestionary)
		setCitizenRegistrationIdentifier(initialCitizenRegisterIdentifier)

		const citizenRegisterResponseMapper = citizenRegistrationQuestionary.map((question) => { // Mapeia todas as questões no contexto
			return { ...question, response: '' }
		}) as CitizenRegisterQuestionResponse[]

		setCitizenRegistrationResponseData(citizenRegisterResponseMapper)
	}

	const saveCitizenRegistrationIdentifier = useCallback((data: CitizenRegistrationIdentifier) => {
		console.log('saveCitizenRegistrationIdentifier')
		console.log(data)
		console.log({ ...citizenRegistrationIdentifier, ...data }) // CURRENT data está sobrescrevendo todo o estado
		setCitizenRegistrationIdentifier({ ...citizenRegistrationIdentifier, ...data })
	}, [citizenRegistrationIdentifier])

	const getNextQuestion = (lastQuestion: CitizenRegisterQuestion) => {
		const lastQuestionId = lastQuestion ? lastQuestion.questionId : ''
		const currentQuestionIndex = citizenRegistrationResponseData.findIndex(({ questionId }) => questionId === lastQuestionId)
		const nextIndex = currentQuestionIndex + 1
		if (nextIndex >= citizenRegistrationResponseData.length) return null
		console.log(citizenRegistrationQuestionToRespond[nextIndex])
		return citizenRegistrationQuestionToRespond[nextIndex]
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
		citizenRegistrationIdentifier,
		startNewCitizenRegistration,
		saveCitizenRegistrationIdentifier,
		getNextQuestion,
		getResponseProgress,
		saveResponseData,
	}

	), [citizenRegistrationResponseData, citizenRegistrationQuestionToRespond, citizenRegistrationIdentifier])

	return (
		<CitizenRegistrationContext.Provider value={CitizenProviderData}>
			{children}
		</CitizenRegistrationContext.Provider>
	)
}

const useCitizenRegistrationContext = () => useContext(CitizenRegistrationContext)

export { CitizenRegistrationProvider, useCitizenRegistrationContext }
