import { ChatUserData } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function updateUserTokenNotification(userId: Id, tokenNotification: string, getRemoteUserData: (idUser: Id) => Promise<ChatUserData>): Promise<void> {
	const dbRef = firebaseDatabase.ref(`${userId}`)

	const remoteUser = await getRemoteUserData(userId)

	if (remoteUser.tokenNotification !== tokenNotification) {
		const updatedRemoteUser = { ...remoteUser, tokenNotification }
		await dbRef.set(updatedRemoteUser)
	}
}

export { updateUserTokenNotification }
