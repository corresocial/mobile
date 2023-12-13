import { ref, update } from 'firebase/database'

import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function updateChatMessages(chatId: Id, messages: MessageObjects) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
	update(realTimeDatabaseRef, messages)
}

export { updateChatMessages }
