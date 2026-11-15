import { ref } from '@react-native-firebase/database'

import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

import { removeValueListeners } from '../listeners/listeners'

async function unsubscribeUserChatIdsListener(userId: Id): Promise<void> {
	const listenerRef = ref(firebaseDatabase, `${userId}`)
	removeValueListeners(listenerRef)
}

async function unsubscribeUserChatListener(chatId: Id): Promise<void> {
	const listenerRef = ref(firebaseDatabase, `${chatId}`)
	removeValueListeners(listenerRef)
}

async function unsubscribeChatMessagesListener(chatId: Id): Promise<void> {
	const listenerRef = ref(firebaseDatabase, `${chatId}/messages`)
	removeValueListeners(listenerRef)
}

export { unsubscribeUserChatIdsListener, unsubscribeUserChatListener, unsubscribeChatMessagesListener }
