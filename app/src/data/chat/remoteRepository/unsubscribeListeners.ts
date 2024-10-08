import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function unsubscribeUserChatIdsListener(userId: Id): Promise<void> {
	const listenerRef = firebaseDatabase.ref(`${userId}`)
	listenerRef.off('value')
}

async function unsubscribeUserChatListener(chatId: Id): Promise<void> {
	const listenerRef = firebaseDatabase.ref(`${chatId}`)
	listenerRef.off('value')
}

async function unsubscribeChatMessagesListener(chatId: Id): Promise<void> {
	const listenerRef = firebaseDatabase.ref(`${chatId}/messages`)
	listenerRef.off('value')
}

export { unsubscribeUserChatIdsListener, unsubscribeUserChatListener, unsubscribeChatMessagesListener }
