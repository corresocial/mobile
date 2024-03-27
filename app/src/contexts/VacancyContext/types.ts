import { ReactNode } from 'react'

import { VacancyEntity, VacancyEntityOptional } from '@domain/post/entity/types'

export interface VacancyProviderProps {
	children: ReactNode
}

export type VacancyContextType = {
	isSecondPost: boolean
	vacancyDataContext: VacancyEntity
	setVacancyDataOnContext: (data: VacancyEntityOptional) => void
	getAditionalDataFromLastPost: () => void
}
