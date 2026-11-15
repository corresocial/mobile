import { push, ref } from '@react-native-firebase/database'

import { Message } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function sendMessage(message: Message, chatId: Id): Promise<boolean> {
	const realTimeDatabaseRef = ref(firebaseDatabase, `${chatId}/messages`)

	try {
		push(realTimeDatabaseRef, message)
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

export { sendMessage }
