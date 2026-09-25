import { ref, set } from '@react-native-firebase/database'

import { Chat } from '@domain/chat/entity/types'

import { firebaseDatabase } from '@infrastructure/firebase'

async function registerNewChat(chatData: Chat) {
	const realTimeDatabaseRef = ref(firebaseDatabase, `${chatData.chatId}`)
	await set(realTimeDatabaseRef, chatData)
}

export { registerNewChat }
