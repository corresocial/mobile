import { ref, remove, set } from 'firebase/database'
import { Id } from '../types'
import { realTimeDatabase } from '..'
import { getRegistredChatData } from './getRemoteChatData'
import { Chat } from '../../../@types/chat/types'

async function cleanMessages(chatId: Id, userSenderLabel: 'user1' | 'user2') {
	const registredChat: Chat = await getRegistredChatData(chatId)

	const privateMessages = { ...registredChat.messages, ...registredChat[userSenderLabel].privateMessages }

	const privateUserMessages = ref(realTimeDatabase, `${chatId}/${userSenderLabel}/privateMessages`)
	await set(privateUserMessages, privateMessages)

	const chatMessages = ref(realTimeDatabase, `${chatId}/messages`)
	await remove(chatMessages)

	return true
}

export { cleanMessages }
