import React from 'react'

import { CultureData } from '@contexts/types'

export interface CultureProviderProps {
	children: React.ReactNode
}

export type CultureContextType = {
	isSecondPost: boolean
	cultureDataContext: CultureData
	setCultureDataOnContext: (data: CultureData) => void
	getAditionalDataFromLastPost: () => void
}
