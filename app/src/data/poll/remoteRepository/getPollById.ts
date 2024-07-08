import { doc, getDoc } from 'firebase/firestore'

import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function getPollDataById(pollId: string) {
	const postRef = doc(firestore, POLL_COLLECTION, pollId)
	const postSnap = await getDoc(postRef)

	if (postSnap.exists()) {
		return { ...postSnap.data(), pollId } as PollEntity
	}
}

export { getPollDataById }
