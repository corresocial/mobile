// Função para receber array e retornar outro array de chats

import { get, ref } from 'firebase/database'

import { Chat, ObjectChatIds } from '@domain/entities/chat/types'

import { Id } from '@services/firebase/types'

import { realTimeDatabase } from '@services/firebase'

async function getUserChats(chatIds: Id[]) {
	try {
		const chatIdsList = convertChatIdsToArray(chatIds as any) // TODO Type

		const chats = chatIdsList.map(async (chatId) => {
			const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)

			const chatData: Chat = await get(realTimeDatabaseRef)
				.then((snapshot) => snapshot.val())
				.catch((err) => console.log(err))

			return chatData
		})

		return Promise.all(chats)
	} catch (err: any) {
		console.log(err)
		return []
	}
}

function convertChatIdsToArray(chatIds: ObjectChatIds): Id[] {
	return Object.values(chatIds).map((chatId) => chatId)
}

export { getUserChats }
