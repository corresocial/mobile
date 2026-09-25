import { DatabaseReference, onValue, ref, Unsubscribe } from '@react-native-firebase/database'

import { Chat, MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

// A API modular não possui off(), então os unsubscribes são guardados por referência para replicar ref.off('value')
const valueListeners: Record<string, Unsubscribe[]> = {}

function trackValueListener(databaseRef: DatabaseReference, unsubscribe: Unsubscribe) {
	const refKey = databaseRef.toString()
	valueListeners[refKey] = [...(valueListeners[refKey] || []), unsubscribe]

	return () => {
		valueListeners[refKey] = (valueListeners[refKey] || []).filter((listener) => listener !== unsubscribe)
		unsubscribe()
	}
}

function removeValueListeners(databaseRef: DatabaseReference) {
	const refKey = databaseRef.toString()
	const unsubscribes = valueListeners[refKey] || []
	delete valueListeners[refKey]
	unsubscribes.forEach((unsubscribe) => unsubscribe())
}

function startUserChatIdsListener(userId: Id, callback: (chatIds: Id[]) => void) {
	if (!userId) return

	const realTimeDatabaseRef = ref(firebaseDatabase, `${userId}/chatIds`)

	const unsubscribe = onValue(realTimeDatabaseRef, (snapshot) => {
		const userChatIds: Id[] = snapshot.val()
		callback(userChatIds)
	})

	return trackValueListener(realTimeDatabaseRef, unsubscribe) // Cleanup function
}

function startUserChatListener(idChat: Id, callback: (chatId: Id, updatedChat: Chat) => void) {
	if (!idChat) return

	const realTimeDatabaseRef = ref(firebaseDatabase, `${idChat}`)

	const unsubscribe = onValue(realTimeDatabaseRef, (snapshot) => {
		callback(idChat, snapshot.val())
	})

	return trackValueListener(realTimeDatabaseRef, unsubscribe) // Cleanup function
}

function startChatMessagesListener(chatId: Id, callback: (newMessages: MessageObjects) => void) {
	const realTimeDatabaseRef = ref(firebaseDatabase, `${chatId}/messages`)

	const unsubscribe = onValue(realTimeDatabaseRef, (snapshot) => {
		callback(snapshot.val())
	})

	return trackValueListener(realTimeDatabaseRef, unsubscribe) // Cleanup function
}

export { startUserChatIdsListener, startUserChatListener, startChatMessagesListener, removeValueListeners }
