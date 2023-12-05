import { get, ref } from 'firebase/database'

import { Id } from '../types'

import { realTimeDatabase } from '@services/firebase'

async function getRemoteUser(userId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)

	const chatData = await get(realTimeDatabaseRef)
		.then((snapshot) => snapshot.val())
		.catch((err) => console.log(err))

	return chatData
}

export { getRemoteUser }
