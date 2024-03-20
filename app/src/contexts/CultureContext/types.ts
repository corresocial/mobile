import React from 'react'

import { CultureCollection } from '@services/firebase/types'

export interface CultureProviderProps {
	children: React.ReactNode
}

export type CultureData = CultureCollection | {}

export type CultureContextType = {
	isSecondPost: boolean
	cultureDataContext: CultureData
	setCultureDataOnContext: (data: CultureData) => void
	getAditionalDataFromLastPost: () => void
}
