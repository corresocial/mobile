import { ref, set } from 'firebase/database'

import { Chat } from '@globalTypes/chat/types'

import { realTimeDatabase } from '@services/firebase'

async function registerNewChat(chat: Chat) {
	const chatWithoutMessages = { ...chat, messages: {} }
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chat.chatId}`)
	set(
		realTimeDatabaseRef,
		chatWithoutMessages
	)
}

export { registerNewChat }
