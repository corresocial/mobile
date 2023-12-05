import { push, ref } from 'firebase/database'

import { Id } from '../types'
import { Message } from '@globalTypes/chat/types'

import { realTimeDatabase } from '@services/firebase'

async function sendMessage(newMessage: Message, chatId: Id) {
	const messagesPath = `${chatId}/messages`

	const realTimeDatabaseRef = ref(realTimeDatabase, messagesPath)

	push(
		realTimeDatabaseRef,
		newMessage
	)
}

export { sendMessage }
