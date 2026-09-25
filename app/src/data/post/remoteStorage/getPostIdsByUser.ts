import { collection, getDocs, orderBy, query, where } from '@react-native-firebase/firestore'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

export async function getPostIdsByUser(userId: string) {
	try {
		const postsByUserQuery = query(
			collection(firebaseFirestore, POST_COLLECTION),
			where('owner.userId', '==', userId),
			orderBy('createdAt', 'desc')
		)

		const postsSnap = await getDocs(postsByUserQuery)
		return postsSnap.docs.map((doc) => doc.id)
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter os identificadores dos posts')
	}
}
