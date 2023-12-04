import { push, ref } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Message } from '../../../types/chat/types'
import { Id } from '../types'

async function sendMessage(newMessage: Message, chatId: Id) {
	const messagesPath = `${chatId}/messages`

	const realTimeDatabaseRef = ref(realTimeDatabase, messagesPath)

	push(
		realTimeDatabaseRef,
		newMessage
	)
}

export { sendMessage }
