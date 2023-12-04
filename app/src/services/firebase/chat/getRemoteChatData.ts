import { get, ref } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Chat, UserIdentification } from '../../../types/chat/types'
import { Id } from '../types'

async function getRemoteChatData(userSender: UserIdentification, userReceiver: UserIdentification) {
	const chatId1 = `${userSender.userId}-${userReceiver.userId}`
	const chatId2 = `${userReceiver.userId}-${userSender.userId}`

	if (await chatAlreadyExists(chatId1)) {
		const { user1, user2, messages } = await getRegistredChatData(chatId1) as Chat
		return {
			chatId: chatId1,
			user1,
			user2,
			messages,
		}
	}

	if (await chatAlreadyExists(chatId2)) {
		const { user1, user2, messages } = await getRegistredChatData(chatId2) as Chat
		return {
			chatId: chatId2,
			user1,
			user2,
			messages,
		}
	}

	return {
		chatId: chatId1,
		user1: userSender,
		user2: userReceiver,
		messages: {},
	}
}

const chatAlreadyExists = async (chatId: Id) => {
	const realTimeDatabaseRef = ref(realTimeDatabase, chatId)
	const chatExists = await get(realTimeDatabaseRef)
		.then((snapshot: any) => snapshot.exists())
		.catch((err) => {
			console.log(err)
			return false
		})

	return chatExists
}

const getRegistredChatData = async (chatId: Id) => {
	const realTimeDatabaseRef = ref(realTimeDatabase, chatId)
	return get(realTimeDatabaseRef)
		.then((snapshot: any) => snapshot.val())
		.catch((err) => {
			console.log(err)
			return false
		})
}

export { getRegistredChatData, getRemoteChatData }
