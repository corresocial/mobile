import { get, ref } from 'firebase/database'

import { ChatUserData } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@infrastructure/firebase/index'

async function getRemoteUserData(userId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)

	const remoteUser: ChatUserData = await get(realTimeDatabaseRef)
		.then((snapshot) => snapshot.val())

	return remoteUser
}

export { getRemoteUserData }
