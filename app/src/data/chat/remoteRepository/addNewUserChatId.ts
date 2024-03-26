import { push, ref } from 'firebase/database'

import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function addNewUserChatId(userId: Id, chatId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}/chatIds`)
	await push(realTimeDatabaseRef, chatId)
}

export { addNewUserChatId }
