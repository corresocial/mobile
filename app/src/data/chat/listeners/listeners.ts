import { Chat, MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

function startUserChatIdsListener(userId: Id, callback: (chatIds: Id[]) => void) {
	if (!userId) return

	const realTimeDatabaseRef = firebaseDatabase.ref(`${userId}/chatIds`)

	const onValueChange = realTimeDatabaseRef.on('value', (snapshot) => {
		const userChatIds: Id[] = snapshot.val()
		callback(userChatIds)
	})

	return () => realTimeDatabaseRef.off('value', onValueChange) // Cleanup function
}

function startUserChatListener(idChat: Id, callback: (chatId: Id, updatedChat: Chat) => void) {
	if (!idChat) return

	const realTimeDatabaseRef = firebaseDatabase.ref(`${idChat}`)

	const onValueChange = realTimeDatabaseRef.on('value', (snapshot) => {
		callback(idChat, snapshot.val())
	})

	return () => realTimeDatabaseRef.off('value', onValueChange) // Cleanup function
}

function startChatMessagesListener(chatId: Id, callback: (newMessages: MessageObjects) => void) {
	const realTimeDatabaseRef = firebaseDatabase.ref(`${chatId}/messages`)

	const onValueChange = realTimeDatabaseRef.on('value', (snapshot) => {
		callback(snapshot.val())
	})

	return () => realTimeDatabaseRef.off('value', onValueChange) // Cleanup function
}

export { startUserChatIdsListener, startUserChatListener, startChatMessagesListener }
