import { doc, getDoc } from '@react-native-firebase/firestore'

import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPollDataById(pollId: string) {
	const postRef = doc(firebaseFirestore, POLL_COLLECTION, pollId)
	const postSnap = await getDoc(postRef)

	if (postSnap.exists()) {
		return { ...postSnap.data(), pollId } as PollEntity
	}
}

export { getPollDataById }
