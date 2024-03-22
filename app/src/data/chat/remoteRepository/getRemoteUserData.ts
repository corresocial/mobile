import { get, ref } from 'firebase/database'

import { ChatUserData } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function getRemoteUserData(userId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)

	const remoteUser: ChatUserData = await get(realTimeDatabaseRef)
		.then((snapshot) => snapshot.val())

	return remoteUser
}

export { getRemoteUserData }
