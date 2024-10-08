import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function updateChatCompletedState(chatId: Id, state: boolean): Promise<boolean> {
	try {
		const realTimeDatabaseRef = firebaseDatabase.ref(`${chatId}`)
		await realTimeDatabaseRef.update({ completed: state })
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

export { updateChatCompletedState }
