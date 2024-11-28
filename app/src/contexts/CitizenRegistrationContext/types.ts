import { ReactNode } from 'react'

import { CitizenRegisterEntity, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

export interface CitizenRegistrationProviderProps {
	children: ReactNode
}

export interface CitizenRegistrationIdentifier {
	citizenRegisterId?: string
	name?: string
	cellNumber?: string
	location?: CitizenRegisterEntity['location']
}

export interface CitizenRegistrationContextType {
	citizenRegistrationQuestionToRespond: CitizenRegisterQuestionResponse[]
	citizenRegistrationResponseData: CitizenRegisterQuestionResponse[]
	citizenRegistrationIdentifier: CitizenRegistrationIdentifier
	startNewCitizenRegistration(): void
	saveCitizenRegistrationIdentifier(data: CitizenRegistrationIdentifier): void
	getNextQuestion(lastQuestion: CitizenRegisterQuestionResponse): CitizenRegisterQuestionResponse | null
	getNextUnansweredRequiredQuestion(): CitizenRegisterQuestionResponse | null
	getResponseProgress(currentQuestionId: string | number): number[]
	saveResponseData(question: CitizenRegisterQuestionResponse, response: CitizenRegisterQuestionResponse['response'], specificResponse?: string): void

	showQuestionObservations(): void
}
