import { ref, set, get } from 'firebase/database'
import { Id } from '../types'
import { realTimeDatabase } from '..'
import { Message } from '../../../@types/chat/types'

async function cleanMessages(chatId: Id, userCanView: Id) {
	const chatMessages = ref(realTimeDatabase, `${chatId}/messages`)

	const allMessages = await get(chatMessages)
	const removedForSingleUser = Object.values(allMessages.val()).map((message: Message | any) => { // TODO Type
		if (!message.userCanView) {
			return { ...message, userCanView }
		}
		if (message.userCanView !== userCanView) {
			return false
		}
		return message
	}).filter((filteredMessage) => filteredMessage)

	await set(chatMessages, removedForSingleUser)

	// await remove(chatMessages)

	return true
}

export { cleanMessages }
