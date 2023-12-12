import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

async function setChatIdForUsersUC(userIds: Id[], chatId: Id) {
	const { addNewUserChatId } = ChatGatewayAdapter()

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

export { setChatIdForUsersUC }
