import { ref, set } from 'firebase/database'

import { Id } from '../types'

import { realTimeDatabase } from '@services/firebase'

async function registerNewUser(userId?: Id, chatIds: any = []) {
	if (!userId) return false

	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)
	set(realTimeDatabaseRef, chatIds)
}

export { registerNewUser }
