import { collection, getDocs, limit, orderBy, query, startAfter, where } from '@react-native-firebase/firestore'

import { UserEntity } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase'

export async function getUnapprovedProfiles(maxDocs = 1, lastDoc: UserEntity | null = null) {
	try {
		const collectionRef = collection(firebaseFirestore, USER_COLLECTION)
		let unapprovedProfiles

		if (lastDoc) {
			unapprovedProfiles = query(
				collectionRef,
				where('unapprovedData.updatedAt', '!=', false),
				orderBy('unapprovedData', 'desc'),
				limit(maxDocs),
				startAfter(lastDoc.updatedAt)
			)
		} else {
			unapprovedProfiles = query(
				collectionRef,
				where('unapprovedData', '!=', false),
				orderBy('unapprovedData', 'desc'),
				limit(maxDocs)
			)
		}

		const usersSnap = await getDocs(unapprovedProfiles)
		const users = usersSnap.docs.map((doc) => ({ userId: doc.id, ...doc.data() } as UserEntity))
		const filteredProfiles = users.filter((user) => user.unapprovedData && (user.unapprovedData as any).reject !== true)

		return filteredProfiles
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter os users não aprovados')
	}
}
