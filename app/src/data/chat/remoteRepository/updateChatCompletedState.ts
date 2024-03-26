import { ref, update } from 'firebase/database'

import { Id } from '@domain/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function updateChatCompletedState(chatId: Id, state: boolean) {
	try {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
		await update(realTimeDatabaseRef, { completed: state })
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

export { updateChatCompletedState }
