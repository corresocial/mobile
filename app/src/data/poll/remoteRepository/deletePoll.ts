import { collection, deleteDoc, doc, getDocs } from '@react-native-firebase/firestore'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function deletePoll(pollId: string) {
	const docRef = doc(firebaseFirestore, POLL_COLLECTION, pollId)
	const privateResponsesCollection = collection(docRef, 'responses')

	try {
		const querySnapshot = await getDocs(privateResponsesCollection)
		const deletePromises = querySnapshot.docs.map((responseDoc) => deleteDoc(responseDoc.ref))

		await Promise.all(deletePromises)
		await deleteDoc(docRef)
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar excluir a enquete')
	}
}

export { deletePoll }
