import { ref, update } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Chat } from '../../../@types/chat/types'
import { Id } from '../types'
import { readFromDatabase } from './readFromDatabase'

async function makeAllUserMessagesAsRead(chatId: Id, userId: Id) {
	const chatData: Chat[] = await readFromDatabase([chatId])

	const readedMessages = Object.values(chatData[0].messages).map((message) => {
		if (message.owner !== userId) {
			return {
				...message,
				readed: true
			}
		}
		return message
	})

	// Está mudando o ID das mesnsagems // TODO See

	const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
	const updateMessages = {
		messages: readedMessages
	}
	update(realTimeDatabaseRef, updateMessages)
}

export { makeAllUserMessagesAsRead }
