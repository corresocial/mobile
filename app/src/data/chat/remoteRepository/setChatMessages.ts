import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function setChatMessages(chatId: Id, messages: MessageObjects): Promise<void> {
	const realTimeDatabaseRef = firebaseDatabase.ref(`${chatId}/messages`)
	await realTimeDatabaseRef.set(messages)
}

export { setChatMessages }
