import { get, ref } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Id } from '../types'

async function getRemoteChatData(userSenderId: Id, userRecipientId: Id) {
	const chatId = `${userSenderId}-${userRecipientId}`

	if (await chatAlreadyExists(chatId)) {
		const { userId1, userId2, messages } = await getRegistredChatData(chatId)
		return {
			chatId,
			userId1,
			userId2,
			messages,
		}
	}

	return {
		chatId,
		userId1: userSenderId,
		userId2: userRecipientId,
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

export { getRemoteChatData }
