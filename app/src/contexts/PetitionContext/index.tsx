import React, { createContext, useContext, useMemo, useState } from 'react'

import { ExtraIdentificationRequest, PetitionEntity, PetitionEntityOptional, PrivatePetitionResponse } from '@domain/petition/entity/types'

import { PetitionContextType, PetitionProviderProps } from './types'

const initialValue: PetitionContextType = {
	petitionDataContext: {} as PetitionEntity,
	petitionSignatureData: {} as PrivatePetitionResponse,
	petitionToRespond: {} as PetitionEntity,
	petitionSignatureDataWithoutResponse: () => [] as ExtraIdentificationRequest[] || null,
	setPetitionDataOnContext: (data: PetitionEntityOptional) => { },
	savePetitionToRespondOnContext: (petitionData: PetitionEntity) => { },
	setPetitionSignatureOnContext: (data: Partial<PrivatePetitionResponse>) => { }
}

const PetitionContext = createContext<PetitionContextType>(initialValue)

function PetitionProvider({ children }: PetitionProviderProps) {
	const [petitionDataContext, setPetitionDataContext] = useState(initialValue.petitionDataContext)

	const [petitionToRespond, setPetitoinToRespond] = useState(initialValue.petitionDataContext)
	const [petitionSignatureData, setPetitionSignatureData] = useState(initialValue.petitionSignatureData)

	const setPetitionDataOnContext = async (data: PetitionEntityOptional) => {
		console.log({ ...petitionDataContext, ...data })
		setPetitionDataContext({ ...petitionDataContext, ...data })
	}

	const setPetitionSignatureOnContext = async (data: Partial<PrivatePetitionResponse>) => {
		console.log({ ...petitionSignatureData, ...data })
		setPetitionSignatureData({ ...petitionSignatureData, ...data })
	}

	const savePetitionToRespondOnContext = (petitionData: PetitionEntity) => {
		setPetitoinToRespond(petitionData)
	}

	const petitionSignatureDataWithoutResponse = () => {
		const petitionAlreadyResonded: ExtraIdentificationRequest[] = []
		petitionSignatureData.cpf ?? petitionAlreadyResonded.push('cpf')
		petitionSignatureData.rg ?? petitionAlreadyResonded.push('rg')
		petitionSignatureData.cellNumber ?? petitionAlreadyResonded.push('telefone')

		const petitionWithoutResponse = petitionToRespond.extraIdentificationRequest
			.filter((info) => petitionAlreadyResonded.includes(info as ExtraIdentificationRequest))

		console.log(petitionWithoutResponse)

		if (petitionWithoutResponse.length) {
			return petitionWithoutResponse
		}
		return null
	}

	const petitionProviderData = useMemo(() => ({
		petitionDataContext,
		setPetitionDataOnContext,
		petitionToRespond,
		petitionSignatureData,
		setPetitionSignatureOnContext,
		petitionSignatureDataWithoutResponse,
		savePetitionToRespondOnContext

	}), [petitionDataContext, petitionSignatureData])

	return (
		<PetitionContext.Provider value={petitionProviderData}>
			{children}
		</PetitionContext.Provider>
	)
}

const usePetitionContext = () => useContext(PetitionContext)

export { PetitionProvider, usePetitionContext }
