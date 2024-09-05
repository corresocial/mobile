import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function addNewUserChatId(userId: Id, chatId: Id) {
	const realTimeDatabaseRef = firebaseDatabase.ref(`${userId}/chatIds`)
	realTimeDatabaseRef.push(chatId)
}

export { addNewUserChatId }
