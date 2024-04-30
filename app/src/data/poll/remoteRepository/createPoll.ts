import { addDoc, collection } from 'firebase/firestore'

import { PollEntityOptional } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function createPoll(pollData: PollEntityOptional) {
	const collectionRef = collection(firestore, POLL_COLLECTION)
	await addDoc(collectionRef, pollData)
}

export { createPoll }
