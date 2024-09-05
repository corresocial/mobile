import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function existsOnDatabase(nodeId?: Id): Promise<boolean> {
	if (!nodeId) return false
	try {
		const realTimeDatabaseRef = firebaseDatabase.ref(`${nodeId}`)
		const snapshot = await realTimeDatabaseRef.once('value')
		return snapshot.exists()
	} catch (error) {
		console.error('Erro ao verificar existência no banco de dados:', error)
		return false
	}
}

export { existsOnDatabase }
