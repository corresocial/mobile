import { ReactNode } from 'react'

import { CultureEntity, CultureEntityOptional } from '@domain/post/entity/types'

export interface CultureProviderProps {
	children: ReactNode
}

export type CultureContextType = {
	isSecondPost: boolean
	cultureDataContext: CultureEntity
	setCultureDataOnContext: (data: CultureEntityOptional) => void
	getAditionalDataFromLastPost: () => void
}
