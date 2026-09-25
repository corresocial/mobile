import { ref, update } from '@react-native-firebase/database'

import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function updateChatCompletedState(chatId: Id, state: boolean): Promise<boolean> {
	try {
		const realTimeDatabaseRef = ref(firebaseDatabase, `${chatId}`)
		await update(realTimeDatabaseRef, { completed: state })
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

export { updateChatCompletedState }
