import { ref, remove } from 'firebase/database'
import { Id } from '../types'
import { realTimeDatabase } from '..'

async function cleanMessages(chatId: Id) {
	/* 	const registredChat: Chat = await getRegistredChatData(chatId)
	
		const privateMessages = { ...registredChat.messages, ...registredChat[userSenderLabel].privateMessages }
	
		const privateUserMessages = ref(realTimeDatabase, `${chatId}/${userSenderLabel}/privateMessages`)
		await set(privateUserMessages, privateMessages) */

	const chatMessages = ref(realTimeDatabase, `${chatId}/messages`)
	await remove(chatMessages)

	return true
}

export { cleanMessages }
