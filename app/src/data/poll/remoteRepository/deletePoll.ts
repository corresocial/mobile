import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

import { POLL_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function deletePoll(pollId: string) {
	const docRef = doc(firestore, POLL_COLLECTION, pollId)
	const privateResponsesCollection = collection(firestore, POLL_COLLECTION, pollId, 'responses')

	getDocs(privateResponsesCollection).then((querySnapshot) => {
		querySnapshot.forEach((document) => {
			deleteDoc(document.ref)
		})
	}).then(() => {
		deleteDoc(docRef)
	})
}

export { deletePoll }
