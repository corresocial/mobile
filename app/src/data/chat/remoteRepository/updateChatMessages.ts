import { ref, update } from '@react-native-firebase/database'

import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function updateChatMessages(chatId: Id, messages: MessageObjects): Promise<void> {
	const realTimeDatabaseRef = ref(firebaseDatabase, `${chatId}/messages`)
	await update(realTimeDatabaseRef, messages)
}

export { updateChatMessages }
