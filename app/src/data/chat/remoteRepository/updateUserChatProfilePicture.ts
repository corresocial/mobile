import { ref, update } from '@react-native-firebase/database'

import { ChatUserIdentification } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function updateUserChatProfilePicture(chatId: Id, chatUsers: { user1: ChatUserIdentification, user2: ChatUserIdentification }): Promise<void> {
	const realTimeDatabaseRef = ref(firebaseDatabase, `${chatId}`)
	await update(realTimeDatabaseRef, chatUsers)
}

export { updateUserChatProfilePicture }
