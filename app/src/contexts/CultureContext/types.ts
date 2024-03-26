import { ReactNode } from 'react'

import { CultureCollection } from '@domain/post/entity/types'

export interface CultureProviderProps {
	children: ReactNode
}

export type CulturePostData = Partial<CultureCollection>

export type CultureContextType = {
	isSecondPost: boolean
	cultureDataContext: CulturePostData | {}
	setCultureDataOnContext: (data: CulturePostData) => void
	getAditionalDataFromLastPost: () => void
}
