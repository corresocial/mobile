import { ReactNode } from 'react'

export interface CitizenRegistrationProviderProps{
    children: ReactNode
}

export interface CitizenRegistrationContextType{
    citizenData: object
    saveQuestionResponse: (data: object) => void
}