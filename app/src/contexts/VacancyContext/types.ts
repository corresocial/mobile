import { ReactNode } from 'react'

import { VacancyCollection } from '@services/firebase/types'

export interface VacancyProviderProps {
	children: ReactNode
}

export type VacancyPostData = VacancyCollection

export type VacancyContextType = {
	isSecondPost: boolean
	vacancyDataContext: VacancyPostData | {}
	setVacancyDataOnContext: (data: VacancyPostData) => void
	getAditionalDataFromLastPost: () => void
}
