import { ReactNode } from 'react'

import { CitizenRegisterQuestionary, CitizenRegisterQuestion, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

export interface CitizenRegistrationProviderProps {
	children: ReactNode
}

export interface CitizenRegistrationIdentifier {
	name?: string
	cellNumber?: string
}

export interface CitizenRegistrationContextType {
	citizenRegistrationQuestionToRespond: CitizenRegisterQuestionary
	citizenRegistrationResponseData: CitizenRegisterQuestionResponse[]
	citizenRegistrationIdentifier: CitizenRegistrationIdentifier
	startNewCitizenRegistration(): void
	saveCitizenRegistrationIdentifier(data: CitizenRegistrationIdentifier): void
	getNextQuestion(lastQuestion: CitizenRegisterQuestion): CitizenRegisterQuestion | null
	getResponseProgress: (currentQuestionId: string | number) => number[]
	saveResponseData(question: CitizenRegisterQuestion, response: CitizenRegisterQuestionResponse['response']): void
}
