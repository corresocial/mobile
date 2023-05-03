import { get, ref, set } from 'firebase/database'
import { realTimeDatabase } from '..'
import { Id } from '../types'

async function setChatIdToUsers(userIds: Id[], chatId: Id) {
	userIds.forEach(async (userId) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}/chatIds`)
		const dataAlreadyRegistred = await getUserChatIds(userId) || []

		if (!dataAlreadyRegistred.chatIds) return

		const filteredRegistredChatIds = dataAlreadyRegistred.chatIds.filter((idChat: Id) => idChat)

		const filteredChatIds = removeEqualsChatIds([...filteredRegistredChatIds, chatId])
		set(
			realTimeDatabaseRef,
			filteredChatIds
		)
	})
}

const getUserChatIds = async (userId: Id) => {
	const realTimeDatabaseRef = ref(realTimeDatabase, userId)
	return get(realTimeDatabaseRef)
		.then((snapshot: any) => snapshot.val())
		.catch((err) => {
			console.log(err)
			return false
		})
}

const removeEqualsChatIds = (chatIds: Id[]) => {
	return chatIds.filter((elem, index) => chatIds.indexOf(elem) === index)
}

export { setChatIdToUsers }
