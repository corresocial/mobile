import { get, ref } from '@react-native-firebase/database'

import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function existsOnDatabase(nodeId?: Id): Promise<boolean> {
	if (!nodeId) return false
	try {
		const realTimeDatabaseRef = ref(firebaseDatabase, `${nodeId}`)
		const snapshot = await get(realTimeDatabaseRef)
		return snapshot.exists()
	} catch (error) {
		console.error('Erro ao verificar existência no banco de dados:', error)
		return false
	}
}

export { existsOnDatabase }
