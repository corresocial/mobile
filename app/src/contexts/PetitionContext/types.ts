import { ReactNode } from 'react'

import { ExtraIdentificationRequest, PetitionEntity, PetitionEntityOptional, PrivatePetitionResponse } from '@domain/petition/entity/types'

export interface PetitionProviderProps {
	children: ReactNode
}

export type PetitionContextType = {
	petitionDataContext: PetitionEntity
	petitionSignatureData: PrivatePetitionResponse
	petitionToRespond: PetitionEntity
	setPetitionDataOnContext: (data: PetitionEntityOptional) => void
	petitionSignatureDataWithoutResponse: () => ExtraIdentificationRequest[] | null
	savePetitionToRespondOnContext: (petitionData: PetitionEntity) => void
	setPetitionSignatureOnContext: (data: Partial<PrivatePetitionResponse>) => void
}
