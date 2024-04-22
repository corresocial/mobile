import { ReactNode } from 'react'

import { PetitionEntity, PetitionEntityOptional } from '@domain/petition/entity/types'

export interface PetitionProviderProps {
	children: ReactNode
}

export type PetitionContextType = {
	petitionDataContext: PetitionEntity
	setPetitionDataOnContext: (data: PetitionEntityOptional) => void
}
