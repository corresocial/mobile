import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function deletePetition(petitionId: string) {
	const docRef = doc(firestore, PETITION_COLLECTION, petitionId)
	const privateResponsesCollection = collection(firestore, PETITION_COLLECTION, petitionId, 'responses')

	getDocs(privateResponsesCollection).then((querySnapshot) => {
		querySnapshot.forEach((document) => {
			deleteDoc(document.ref)
		})
	}).then(() => {
		deleteDoc(docRef)
	})
}

export { deletePetition }
