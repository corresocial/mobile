import { get, ref } from 'firebase/database'

import { UserDatabase } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function getUserChatIds(userId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)

	const chatData: UserDatabase = await get(realTimeDatabaseRef)
		.then((snapshot) => snapshot.val())

	return chatData.chatIds || []
}

export { getUserChatIds }
