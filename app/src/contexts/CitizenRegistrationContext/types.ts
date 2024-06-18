import { ReactNode } from 'react'

import { CitizenRegisterQuestionary, CitizenRegisterQuestion, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

export interface CitizenRegistrationProviderProps {
	children: ReactNode
}

export interface CitizenRegistrationContextType {
	citizenRegistrationQuestionToRespond: CitizenRegisterQuestionary
	citizenRegistrationResponseData: CitizenRegisterQuestionResponse[]
	startNewCitizenRegistration(): void
	getNextQuestion(lastQuestion: CitizenRegisterQuestion): CitizenRegisterQuestion | null
	getResponseProgress: (currentQuestionId: string | number) => number[]
	saveResponseData(question: CitizenRegisterQuestion, response: CitizenRegisterQuestionResponse['response']): void
}
