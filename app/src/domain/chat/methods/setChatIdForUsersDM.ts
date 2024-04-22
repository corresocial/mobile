import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function setChatIdForUsersDM(userIds: Id[], chatId: Id) {
	const { addNewUserChatId } = useChatRepository()

	try {
		userIds.forEach(async (userId) => {
			/* const registeredChatIds = await getUserChatIds(userId) || []
			 const filteredRegistredChatIds = registeredChatIds.filter((idChat: Id) => idChat)
			const filteredChatIds = removeEqualsChatIds([...filteredRegistredChatIds, chatId]) */

			await addNewUserChatId(userId, chatId)
		})
	} catch (err: any) {
		console.log(err)
		throw new Error(err)
	}
}

/* function removeEqualsChatIds(chatIds: Id[]) {
	return chatIds.filter((elem, index) => chatIds.indexOf(elem) === index)
} */

export { setChatIdForUsersDM }
