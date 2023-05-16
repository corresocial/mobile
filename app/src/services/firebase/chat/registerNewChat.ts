import { ref, set } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Chat } from '../../../@types/chat/types'

async function registerNewChat(chat: Chat) {
	const chatWithoutMessages = { ...chat, messages: {} }
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chat.chatId}`)
	set(
		realTimeDatabaseRef,
		chatWithoutMessages
	)
}

export { registerNewChat }
