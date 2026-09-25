import { addDoc, collection } from '@react-native-firebase/firestore'

import { PollEntityOptional } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPoll(pollData: PollEntityOptional) {
	const collectionRef = collection(firebaseFirestore, POLL_COLLECTION)
	await addDoc(collectionRef, pollData)
}

export { createPoll }
