import { ref, update } from 'firebase/database'

import { ChatUserIdentification } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function updateUserChatProfilePicture(chatId: Id, chatUsers: { user1: ChatUserIdentification, user2: ChatUserIdentification }) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
	update(realTimeDatabaseRef, chatUsers)
}

export { updateUserChatProfilePicture }
