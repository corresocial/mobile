import { Message } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function sendMessage(message: Message, chatId: Id): Promise<boolean> {
	const realTimeDatabaseRef = firebaseDatabase.ref(`${chatId}/messages`)

	try {
		realTimeDatabaseRef.push(message)
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

export { sendMessage }
