import { ReactNode } from 'react'

import { IncomeEntity, IncomeEntityOptional } from '@domain/post/entity/types'

export interface SaleProviderProps {
	children: ReactNode
}

export type SaleContextType = {
	isSecondPost: boolean
	saleDataContext: IncomeEntity | {}
	setSaleDataOnContext: (data: IncomeEntityOptional) => void
	getAditionalDataFromLastPost: () => void
}
