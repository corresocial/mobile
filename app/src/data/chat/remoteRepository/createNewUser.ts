import { ref, set } from 'firebase/database'

import { UserDatabase } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function registerNewUser(userId: Id, initialUserData: Partial<UserDatabase>) {
	if (!userId) return false

	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)
	set(realTimeDatabaseRef, initialUserData)
	return true
}

export { registerNewUser }
