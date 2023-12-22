import { ref, set } from 'firebase/database'

import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function setChatMessages(chatId: Id, messages: MessageObjects) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
	set(realTimeDatabaseRef, messages)
}

export { setChatMessages }
