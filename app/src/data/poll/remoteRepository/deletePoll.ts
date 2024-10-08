import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function deletePoll(pollId: string) {
	const docRef = firebaseFirestore.collection(POLL_COLLECTION).doc(pollId)
	const privateResponsesCollection = docRef.collection('responses')

	try {
		const querySnapshot = await privateResponsesCollection.get()
		const deletePromises = querySnapshot.docs.map((doc) => doc.ref.delete())

		await Promise.all(deletePromises)
		await docRef.delete()
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar excluir a enquete')
	}
}

export { deletePoll }
