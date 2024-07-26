import { addDoc, collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'

import { CitizenRegisterEntity } from '@domain/citizenRegister/model/entities/types'
import { CitizenRegisterRemoteRepositoryInterface } from '@domain/citizenRegister/provider/CitizenRegisterRemoteRepositoryInterface'

import { CITIZEN_REGISTER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase'

export class CitizenRegisterRemoteRepository implements CitizenRegisterRemoteRepositoryInterface {
	async createCitizenRegister(data: CitizenRegisterEntity) {
		const collectionRef = collection(firestore, CITIZEN_REGISTER_COLLECTION)

		const citizenRegisterData = { ...data }
		const docRef = await addDoc(collectionRef, citizenRegisterData)

		return { ...citizenRegisterData, citizenRegisterId: docRef.id } as CitizenRegisterEntity
	}

	async getCitizenRegistrationsByCoordinator(coordinatorId: string, maxDocs = 2, lastDoc: CitizenRegisterEntity | null = null) {
		try {
			const collectionRef = collection(firestore, CITIZEN_REGISTER_COLLECTION)
			let CizienRegistersByCoordinatorQuery
			if (lastDoc) {
				CizienRegistersByCoordinatorQuery = query(
					collectionRef,
					where('coordinatorId', '==', coordinatorId),
					orderBy('createdAt', 'desc'),
					limit(maxDocs),
					startAfter(lastDoc.createdAt)
				)
			} else {
				CizienRegistersByCoordinatorQuery = query(
					collectionRef,
					where('coordinatorId', '==', coordinatorId),
					orderBy('createdAt', 'desc'),
					limit(maxDocs),
				)
			}

			const citizenRegistersSnap = await getDocs(CizienRegistersByCoordinatorQuery)
			return citizenRegistersSnap.docs.map((doc) => ({ citizenRegisterId: doc.id, ...doc.data() } as CitizenRegisterEntity))
		} catch (error) {
			console.log(error)
			throw new Error('Houve um erro ao tentar obter os cadastros cidadãos')
		}
	}
}
