import { ChatUserData } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function getRemoteUserData(userId: Id): Promise<ChatUserData | null> {
	try {
		if (!isValidUserId(userId)) {
			throw new Error(`◊UserId contém caracteres inválidos. Operação cancelada \n id: ${userId}`)
		}

		const realTimeDatabaseRef = firebaseDatabase.ref(`${userId}`)

		const snapshot = await realTimeDatabaseRef.once('value')
		const remoteUser: ChatUserData | null = snapshot.val()
		return remoteUser
	} catch (error) {
		console.error('Erro ao obter dados do usuário:', error)
		return null
	}
}

function isValidUserId(userId: string): boolean {
	// Verifica se o userId contém algum caractere inválido (., #, $, [, ])
	return !(/[.#$[\]]/.test(userId))
}

export { getRemoteUserData }
