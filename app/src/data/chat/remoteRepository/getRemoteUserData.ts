import { ChatUserData } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function getRemoteUserData(userId: Id): Promise<ChatUserData | null> {
	const realTimeDatabaseRef = firebaseDatabase.ref(`${userId}`)

	try {
		const snapshot = await realTimeDatabaseRef.once('value')
		const remoteUser: ChatUserData | null = snapshot.val()
		return remoteUser
	} catch (error) {
		console.error('Erro ao obter dados do usuário:', error)
		return null
	}
}

export { getRemoteUserData }
