import { addDoc, getDocs, limit, orderBy, query, startAfter, where } from '@react-native-firebase/firestore'

import { CitizenRegisterEntity } from '@domain/citizenRegister/model/entities/types'
import { CitizenRegisterRemoteRepositoryInterface } from '@domain/citizenRegister/provider/CitizenRegisterRemoteRepositoryInterface'

import { CITIZEN_REGISTER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase'

export class CitizenRegisterRemoteRepository implements CitizenRegisterRemoteRepositoryInterface {
	async createCitizenRegister(data: CitizenRegisterEntity) {
		const collectionRef = firebaseFirestore.collection(CITIZEN_REGISTER_COLLECTION)

		const citizenRegisterData = { ...data }
		const docRef = await addDoc(collectionRef, citizenRegisterData)

		return { ...citizenRegisterData, citizenRegisterId: docRef.id } as CitizenRegisterEntity
	}

	async getCitizenRegistrationsByCoordinator(coordinatorId: string, maxDocs = 10, lastDoc: CitizenRegisterEntity | null = null) {
		try {
			const collectionRef = firebaseFirestore.collection(CITIZEN_REGISTER_COLLECTION)
			let citizenRegistersByCoordinatorQuery
			if (lastDoc) {
				citizenRegistersByCoordinatorQuery = query(
					collectionRef,
					where('coordinatorId', '==', coordinatorId),
					orderBy('createdAt', 'desc'),
					limit(maxDocs),
					startAfter(lastDoc.createdAt)
				)
			} else {
				citizenRegistersByCoordinatorQuery = query(
					collectionRef,
					where('coordinatorId', '==', coordinatorId),
					orderBy('createdAt', 'desc'),
					limit(maxDocs),
				)
			}

			const citizenRegistersSnap = await getDocs(citizenRegistersByCoordinatorQuery)
			return citizenRegistersSnap.docs.map((doc) => ({ citizenRegisterId: doc.id, ...doc.data() } as CitizenRegisterEntity))
		} catch (error) {
			console.log(error)
			throw new Error('Houve um erro ao tentar obter os cadastros cidadãos')
		}
	}

	async getAllCitizenRegisters(maxDocs = 10, lastDoc: CitizenRegisterEntity | null = null) {
		try {
			const collectionRef = firebaseFirestore.collection(CITIZEN_REGISTER_COLLECTION)
			let allCitizenRegistersQuery
			if (lastDoc) {
				allCitizenRegistersQuery = query(
					collectionRef,
					orderBy('createdAt', 'desc'),
					limit(maxDocs),
					startAfter(lastDoc.createdAt)
				)
			} else {
				allCitizenRegistersQuery = query(
					collectionRef,
					orderBy('createdAt', 'desc'),
					limit(maxDocs),
				)
			}

			const citizenRegistersSnap = await getDocs(allCitizenRegistersQuery)
			return citizenRegistersSnap.docs.map((doc) => ({ citizenRegisterId: doc.id, ...doc.data() } as CitizenRegisterEntity))
		} catch (error) {
			console.log(error)
			throw new Error('Houve um erro ao tentar obter os cadastros cidadãos')
		}
	}
}
