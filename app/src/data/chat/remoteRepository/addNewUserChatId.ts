import { push, ref } from '@react-native-firebase/database'

import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function addNewUserChatId(userId: Id, chatId: Id) {
	const realTimeDatabaseRef = ref(firebaseDatabase, `${userId}/chatIds`)
	push(realTimeDatabaseRef, chatId)
}

export { addNewUserChatId }
