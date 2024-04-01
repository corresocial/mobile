import { get, ref } from 'firebase/database'

import { UserDatabase } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@infrastructure/firebase/index'

async function getUserChatIds(userId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)

	const chatData: UserDatabase = await get(realTimeDatabaseRef)
		.then((snapshot) => snapshot.val())

	return chatData.chatIds || []
}

export { getUserChatIds }
