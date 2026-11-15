import { get, ref } from '@react-native-firebase/database'

import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function getRemoteChatData(chatId: Id): Promise<any> {
	const realTimeDatabaseRef = ref(firebaseDatabase, chatId)

	try {
		const snapshot = await get(realTimeDatabaseRef) // Use 'get' para obter os dados uma única vez
		return snapshot.val() // Retorna os dados do snapshot
	} catch (error) {
		console.error('Erro ao obter dados do chat:', error)
		return false // Retorna false em caso de erro
	}
}

export { getRemoteChatData }
