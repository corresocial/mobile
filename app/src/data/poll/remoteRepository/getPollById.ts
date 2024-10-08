import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPollDataById(pollId: string) {
	const postRef = firebaseFirestore.collection(POLL_COLLECTION).doc(pollId)
	const postSnap = await postRef.get()

	if (postSnap.exists) {
		return { ...postSnap.data(), pollId } as PollEntity
	}
}

export { getPollDataById }
