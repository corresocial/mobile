import { onChildChanged, onValue, ref } from 'firebase/database'

import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

function startUserChatIdsListener(userId: Id, callback: (chatIds: Id[]) => void) {
	if (!userId) return

	const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}/chatIds`,) // getDatabaseRef

	onValue(realTimeDatabaseRef, async (snapshot) => {
		const userChatIds: Id[] = snapshot.val()
		callback(userChatIds)
	})
}

function startUserChatListener(idChat: Id, callback: (chatId: Id, messages: MessageObjects) => void) {
	if (!idChat) return
	const realTimeDatabaseRef = ref(realTimeDatabase, `${idChat}`)

	onChildChanged(realTimeDatabaseRef, async (snapshot) => {
		callback(idChat, snapshot.val())
	})
}

function startChatMessagesListener(chatId: Id, callback: (newMessages: MessageObjects) => void) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)

	onValue(realTimeDatabaseRef, (snapshot) => {
		callback(snapshot.val())
	})
}

export { startUserChatIdsListener, startUserChatListener, startChatMessagesListener }
