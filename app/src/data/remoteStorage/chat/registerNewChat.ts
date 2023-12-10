import { ref, set } from 'firebase/database'

import { Chat } from '@domain/entities/chat/types'

import { realTimeDatabase } from '@services/firebase'

async function registerNewChat(chatData: Chat) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatData.chatId}`)

	return set(realTimeDatabaseRef, chatData)
}

export { registerNewChat }
