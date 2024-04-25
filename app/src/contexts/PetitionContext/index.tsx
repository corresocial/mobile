import React, { createContext, useContext, useMemo, useState } from 'react'

import { PetitionEntity, PetitionEntityOptional, PrivatePetitionResponse } from '@domain/petition/entity/types'

import { PetitionContextType, PetitionProviderProps } from './types'

const initialValue: PetitionContextType = {
	petitionDataContext: {} as PetitionEntity,
	petitionSignatureData: {} as PrivatePetitionResponse,
	setPetitionDataOnContext: (data: PetitionEntityOptional) => { },
	setPetitionSignatureOnContext: (data: Partial<PrivatePetitionResponse>) => { }
}

const PetitionContext = createContext<PetitionContextType>(initialValue)

function PetitionProvider({ children }: PetitionProviderProps) {
	const [petitionDataContext, setPetitionDataContext] = useState(initialValue.petitionDataContext)
	const [petitionSignatureData, setPetitionSignatureData] = useState(initialValue.petitionSignatureData)

	const setPetitionDataOnContext = async (data: PetitionEntityOptional) => {
		console.log({ ...petitionDataContext, ...data })
		setPetitionDataContext({ ...petitionDataContext, ...data })
	}

	const setPetitionSignatureOnContext = async (data: Partial<PrivatePetitionResponse>) => {
		console.log({ ...petitionSignatureData, ...data })
		setPetitionSignatureData({ ...petitionSignatureData, ...data })
	}

	const petitionProviderData = useMemo(() => ({
		petitionDataContext,
		petitionSignatureData,
		setPetitionDataOnContext,
		setPetitionSignatureOnContext
	}), [petitionDataContext, petitionSignatureData])

	return (
		<PetitionContext.Provider value={petitionProviderData}>
			{children}
		</PetitionContext.Provider>
	)
}

const usePetitionContext = () => useContext(PetitionContext)

export { PetitionProvider, usePetitionContext }
