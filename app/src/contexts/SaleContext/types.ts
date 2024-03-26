import { ReactNode } from 'react'

import { IncomeCollection } from '@domain/post/entity/types'

export interface SaleProviderProps {
	children: ReactNode
}

export type SalePostData = Partial<IncomeCollection>

export type SaleContextType = {
	isSecondPost: boolean
	saleDataContext: SalePostData | {}
	setSaleDataOnContext: (data: SalePostData) => void
	getAditionalDataFromLastPost: () => void
}
