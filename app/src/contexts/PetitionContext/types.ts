import { ReactNode } from 'react'

import { PetitionEntity, PetitionEntityOptional, PrivatePetitionResponse } from '@domain/petition/entity/types'

export interface PetitionProviderProps {
	children: ReactNode
}

export type PetitionContextType = {
	petitionDataContext: PetitionEntity
	petitionSignatureData: PrivatePetitionResponse
	setPetitionDataOnContext: (data: PetitionEntityOptional) => void
	setPetitionSignatureOnContext: (data: Partial<PrivatePetitionResponse>) => void
}
