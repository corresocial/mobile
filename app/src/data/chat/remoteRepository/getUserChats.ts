// Função para receber array e retornar outro array de chats

import { get, ref } from 'firebase/database'

import { Chat } from '@domain/chat/entity/types'
import { Id } from '@domain/post/entity/types'

import { realTimeDatabase } from '@infrastructure/firebase/index'

async function getUserChats(chatIds: Id[]) {
	try {
		const chats = chatIds.map(async (chatId) => {
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

export { getUserChats }
