import { addDoc, collection } from 'firebase/firestore'

import { CitizenRegisterEntity } from '@domain/citizenRegister/model/entities/types'
import { CitizenRegisterRemoteRepositoryInterface } from '@domain/citizenRegister/provider/CitizenRegisterRemoteRepositoryInterface'

import { CITIZEN_REGISTER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase'

export class CitizenRegisterRemoteRepository implements CitizenRegisterRemoteRepositoryInterface {
	async createCitizenRegister(data: CitizenRegisterEntity) {
		const collectionRef = collection(firestore, CITIZEN_REGISTER_COLLECTION)

		const financeData = { ...data }
		const docRef = await addDoc(collectionRef, financeData)

		return { ...financeData, id: docRef.id } as CitizenRegisterEntity
	}
}
