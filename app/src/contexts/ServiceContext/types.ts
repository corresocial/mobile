import { ReactNode } from 'react'

import { IncomeEntity, IncomeEntityOptional } from '@domain/post/entity/types'

export interface ServiceProviderProps {
	children: ReactNode
}

export type ServiceContextType = {
	isSecondPost: boolean
	serviceDataContext: IncomeEntity
	setServiceDataOnContext: (data: IncomeEntityOptional) => void
	getAditionalDataFromLastPost: () => void
}
