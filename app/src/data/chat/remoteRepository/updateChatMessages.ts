import { ref, update } from 'firebase/database'

import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@infrastructure/firebase/index'

async function updateChatMessages(chatId: Id, messages: MessageObjects) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
	update(realTimeDatabaseRef, messages)
}

export { updateChatMessages }
