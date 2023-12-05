import { get, ref } from 'firebase/database'

import { Id } from '../types'

import { realTimeDatabase } from '..'

async function readFromDatabase(allChatIds: Id[]) {
	const chats = allChatIds.map(async (chatId) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)

		const chatData = await get(realTimeDatabaseRef)
			.then((snapshot) => snapshot.val())
			.catch((err) => console.log(err))

		return chatData
	})

	return Promise.all(chats)
}

export { readFromDatabase }
