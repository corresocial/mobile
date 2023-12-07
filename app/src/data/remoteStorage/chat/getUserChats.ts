// Função para receber array e retornar outro array de chats

import { get, ref } from 'firebase/database'

import { Chat } from '@domain/entities/chat/types'

import { Id } from '@services/firebase/types'

import { realTimeDatabase } from '@services/firebase'

async function getUserChats(chatIds: Id[]) {
	const chats = chatIds.map(async (chatId) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)

		const chatData: Chat = await get(realTimeDatabaseRef)
			.then((snapshot) => snapshot.val())
			.catch((err) => console.log(err))

		return chatData
	})

	return Promise.all(chats)
}

export { getUserChats }
