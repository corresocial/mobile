import { Chat } from '@domain/chat/entity/types'
import { Id } from '@domain/post/entity/types'

import { firebaseDatabase } from '@infrastructure/firebase'

async function getUserChats(chatIds: Id[]): Promise<Chat[]> {
	try {
		const chats = chatIds.map(async (chatId) => {
			const realTimeDatabaseRef = firebaseDatabase.ref(`${chatId}`)
			const snapshot = await realTimeDatabaseRef.once('value')
			return snapshot.val()
		})

		return Promise.all(chats)
	} catch (err) {
		console.error(err)
		return []
	}
}

export { getUserChats }
