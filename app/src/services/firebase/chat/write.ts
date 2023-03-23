import { push, ref, set } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Chat } from '../../../@types/chat/types'

async function writeOnDatabase(chat: Chat, firstMessage?: boolean) {
	if (firstMessage) {
		const chatWithoutMessages = { ...chat, messages: [] }
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chat.chatId}`)
		set(
			realTimeDatabaseRef,
			chatWithoutMessages
		)
	}

	const realTimeDatabaseRef = ref(realTimeDatabase, `${chat.chatId}/messages`)
	push(
		realTimeDatabaseRef,
		chat.messages[0]
	)
}

export { writeOnDatabase }
