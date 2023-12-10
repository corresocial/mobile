import { push, ref } from 'firebase/database'

import { Id } from '@domain/entities/globalTypes'

import { Message } from '@globalTypes/chat/types'

import { realTimeDatabase } from '@services/firebase'

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
