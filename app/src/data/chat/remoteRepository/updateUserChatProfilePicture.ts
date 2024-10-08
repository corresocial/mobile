import { ChatUserIdentification } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function updateUserChatProfilePicture(chatId: Id, chatUsers: { user1: ChatUserIdentification, user2: ChatUserIdentification }): Promise<void> {
	const realTimeDatabaseRef = firebaseDatabase.ref(`${chatId}`)
	await realTimeDatabaseRef.update(chatUsers)
}

export { updateUserChatProfilePicture }
