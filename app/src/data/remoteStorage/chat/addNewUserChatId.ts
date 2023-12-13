import { push, ref } from 'firebase/database'

import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function addNewUserChatId(userId: Id, chatId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}/chatIds`)
	push(realTimeDatabaseRef, chatId)
}

export { addNewUserChatId }
