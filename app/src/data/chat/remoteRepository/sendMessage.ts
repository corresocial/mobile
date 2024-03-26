import { push, ref } from 'firebase/database'

import { Message } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@infrastructure/firebase/index'

async function sendMessage(message: Message, chatId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)

	try {
		const messageSent = await push(realTimeDatabaseRef, message)
		return !!messageSent
	} catch (err) {
		console.log(err)
		return false
	}
}

export { sendMessage }
