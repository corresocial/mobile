import { ref, set } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Id } from '../types'

async function registerNewUser(userId: Id, chatIds: any) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)
	set(realTimeDatabaseRef, chatIds)
}

export { registerNewUser }
