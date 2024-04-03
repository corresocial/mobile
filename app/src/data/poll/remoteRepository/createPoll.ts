import { addDoc, collection } from 'firebase/firestore'

import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function createPoll(pollData: PollEntity) {
	const collectionRef = collection(firestore, POLL_COLLECTION)
	await addDoc(collectionRef, pollData)
}

export { createPoll }
