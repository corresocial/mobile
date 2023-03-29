import { push, ref } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Message } from '../../../@types/chat/types'
import { Id } from '../types'

type UserReceiver = 'user1' | 'user2'

async function sendMessage(newMessage: Message, chatId: Id, userReceiver?: UserReceiver) {
	let messagesPath
	if (!userReceiver) {
		messagesPath = `${chatId}/messages`
	} else {
		messagesPath = `${chatId}/${userReceiver}/privateMessages`
	}

	const realTimeDatabaseRef = ref(realTimeDatabase, messagesPath)

	push(
		realTimeDatabaseRef,
		newMessage
	)
}

export { sendMessage }
