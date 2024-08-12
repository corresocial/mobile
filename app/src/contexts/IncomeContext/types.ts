import { ReactNode } from 'react'

import { IncomeEntity, IncomeEntityOptional } from '@domain/post/entity/types'

export interface IncomeProviderProps {
	children: ReactNode
}

export type IncomeContextType = {
	isSecondPost: boolean
	incomeDataContext: IncomeEntity
	setIncomeDataOnContext: (data: IncomeEntityOptional) => void
	getAditionalDataFromLastPost: () => void
}
