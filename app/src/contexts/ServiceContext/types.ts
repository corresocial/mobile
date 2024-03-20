import { ReactNode } from 'react'

import { IncomeCollection } from '@services/firebase/types'

export interface ServiceProviderProps {
	children: ReactNode
}

export type ServicePostData = IncomeCollection

export type ServiceContextType = {
	isSecondPost: boolean
	serviceDataContext: ServicePostData | {}
	setServiceDataOnContext: (data: ServicePostData) => void
	getAditionalDataFromLastPost: () => void
}
