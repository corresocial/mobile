import { ref, set } from 'firebase/database'

import { ChatUserData } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function updateUserTokenNotification(userId: Id, userData: ChatUserData) {
	const dbRef = ref(realTimeDatabase, `${userId}`)
	set(dbRef, userData)
	return true
}

export { updateUserTokenNotification }
