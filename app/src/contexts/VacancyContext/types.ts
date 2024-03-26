import { ReactNode } from 'react'

import { VacancyCollection } from '@domain/post/entity/types'

export interface VacancyProviderProps {
	children: ReactNode
}

export type VacancyPostData = Partial<VacancyCollection>

export type VacancyContextType = {
	isSecondPost: boolean
	vacancyDataContext: VacancyPostData | {}
	setVacancyDataOnContext: (data: VacancyPostData) => void
	getAditionalDataFromLastPost: () => void
}
