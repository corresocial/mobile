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

const startUserChatListener = async (idChat: Id, callback: (chatId: Id, messages: MessageObjects) => void) => {
	if (!idChat) return
	const realTimeDatabaseRef = ref(realTimeDatabase, `${idChat}`)

	onChildChanged(realTimeDatabaseRef, async (snapshot) => {
		callback(idChat, snapshot.val())
	})
}

export { startUserChatIdsListener, startUserChatListener }
