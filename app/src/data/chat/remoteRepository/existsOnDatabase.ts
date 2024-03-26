import { get, ref } from 'firebase/database'

import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@infrastructure/firebase/index'

async function existsOnDatabase(nodeId?: Id) {
	if (!nodeId) return false

	const realTimeDatabaseRef = ref(realTimeDatabase, `${nodeId}`)

	const exists: boolean = await get(realTimeDatabaseRef)
		.then((snapshot: any) => snapshot.exists())

	return exists
}

export { existsOnDatabase }
