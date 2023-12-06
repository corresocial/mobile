import { ref, set } from 'firebase/database'

import { realTimeDatabase } from '@services/firebase'
import { Id } from '@domain/entities/globalTypes'
import { UserDatabase } from '@domain/entities/chat/types'

async function registerNewUser(userId: Id, initialUserData: Partial<UserDatabase>) {
	if (!userId) return false

	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)
	set(realTimeDatabaseRef, initialUserData)
	return true
}

export { registerNewUser }
