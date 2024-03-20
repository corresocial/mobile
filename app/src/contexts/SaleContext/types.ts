import { ReactNode } from 'react'

import { IncomeCollection } from '@services/firebase/types'

export interface SaleProviderProps {
	children: ReactNode
}

export type SalePostData = IncomeCollection

export type SaleContextType = {
	isSecondPost: boolean
	saleDataContext: SalePostData | {}
	setSaleDataOnContext: (data: SalePostData) => void
	getAditionalDataFromLastPost: () => void
}
