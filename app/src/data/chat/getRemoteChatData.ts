import { get, ref } from 'firebase/database'

import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function getRemoteChatData(chatId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, chatId)

	return get(realTimeDatabaseRef)
		.then((snapshot: any) => snapshot.val())
		.catch((err) => {
			console.log(err)
			return false
		})
}

export { getRemoteChatData }
