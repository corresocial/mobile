import { get, ref } from '@react-native-firebase/database'

import { UserDatabase } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function getUserChatIds(userId: Id): Promise<Id[]> {
	const realTimeDatabaseRef = ref(firebaseDatabase, `${userId}`)

	try {
		const snapshot = await get(realTimeDatabaseRef)
		const chatData: UserDatabase | null = snapshot.val()
		return chatData?.chatIds || []
	} catch (error) {
		console.error('Erro ao obter IDs dos chats do usuário:', error)
		return []
	}
}

export { getUserChatIds }
