import { ref, set } from '@react-native-firebase/database'

import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function setChatMessages(chatId: Id, messages: MessageObjects): Promise<void> {
	const realTimeDatabaseRef = ref(firebaseDatabase, `${chatId}/messages`)
	await set(realTimeDatabaseRef, messages)
}

export { setChatMessages }
