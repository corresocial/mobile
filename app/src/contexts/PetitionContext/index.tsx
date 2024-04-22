import React, { createContext, useContext, useMemo, useState } from 'react'

import { PetitionEntity, PetitionEntityOptional } from '@domain/petition/entity/types'

import { PetitionContextType, PetitionProviderProps } from './types'

const initialValue: PetitionContextType = {
	petitionDataContext: {
		range: 'near',
		petitionId: '',
		title: '',
		description: '',
		createdAt: new Date(),
		questions: [],
		location: {
			coordinates: {
				latitude: 0,
				longitude: 0
			},
			geohashNearby: []
		} as any,
		owner: {
			name: '',
			userId: ''
		},

	} as PetitionEntity,
	setPetitionDataOnContext: (data: PetitionEntityOptional) => { }
}

const PetitionContext = createContext<PetitionContextType>(initialValue)

function PetitionProvider({ children }: PetitionProviderProps) {
	const [petitionDataContext, setPetitionDataContext] = useState(initialValue.petitionDataContext)

	const setPetitionDataOnContext = async (data: PetitionEntityOptional) => {
		console.log({ ...petitionDataContext, ...data })
		setPetitionDataContext({ ...petitionDataContext, ...data })
	}

	const petitionProviderData = useMemo(() => ({
		petitionDataContext,
		setPetitionDataOnContext
	}), [petitionDataContext])

	return (
		<PetitionContext.Provider value={petitionProviderData}>
			{children}
		</PetitionContext.Provider>
	)
}

const usePetitionContext = () => useContext(PetitionContext)

export { PetitionProvider, usePetitionContext }
