import { ref, set } from 'firebase/database'

import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@infrastructure/firebase/index'

async function setChatMessages(chatId: Id, messages: MessageObjects) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
	set(realTimeDatabaseRef, messages)
}

export { setChatMessages }
