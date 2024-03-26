import { ref, set } from 'firebase/database'

import { ChatUserData } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function updateUserTokenNotification(userId: Id, tokenNotification: string, getRemoteUserData: (idUser: Id) => Promise<ChatUserData>) {
	const dbRef = ref(realTimeDatabase, `${userId}`)

	const remoteUser = await getRemoteUserData(userId)

	if (remoteUser.tokenNotification !== tokenNotification) {
		const updatedRemoteuser = { ...remoteUser, tokenNotification }
		set(dbRef, updatedRemoteuser)
	}
}

export { updateUserTokenNotification }
