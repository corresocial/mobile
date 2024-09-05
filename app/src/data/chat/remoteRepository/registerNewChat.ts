import { Chat } from '@domain/chat/entity/types'

import { firebaseDatabase } from '@infrastructure/firebase'

async function registerNewChat(chatData: Chat) {
	const realTimeDatabaseRef = firebaseDatabase.ref(`${chatData.chatId}`)
	await realTimeDatabaseRef.set(chatData)
}

export { registerNewChat }
