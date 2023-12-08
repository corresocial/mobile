import { off, ref } from 'firebase/database'

import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function unsubscribeUserChatIdsListener(userId: Id) {
	const listenerRef = ref(realTimeDatabase, `${userId}`)
	off(listenerRef)
}

async function unsubscribeUserChatListener(chatId: Id) {
	const listenerRef = ref(realTimeDatabase, `${chatId}`)
	off(listenerRef)
}

export { unsubscribeUserChatIdsListener, unsubscribeUserChatListener }
