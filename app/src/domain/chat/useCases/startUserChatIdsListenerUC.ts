import { isArray } from 'lodash'

import { Chat } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

async function startUserChatIdsListenerUC(userId: Id, callback: (chatIds: Id[], userChats: Chat[]) => void) {
	const { existsOnDatabase, getUserChats, startUserChatIdsListener } = ChatGatewayAdapter()

	const listenerCallback = async (chatIds: Id[]) => {
		let chatIdsList = chatIds

		if (!isArray(chatIds)) {
			chatIdsList = Object.values(chatIds)
		}

		const filteredChatIds = chatIdsList.filter((chatId) => chatId !== '')
		if (!filteredChatIds || (filteredChatIds && !filteredChatIds.length)) return

		const userChats = await getUserChats(filteredChatIds)
		callback(filteredChatIds, userChats)
	}

	if (await existsOnDatabase(userId)) {
		startUserChatIdsListener(userId, listenerCallback)
	} else {
		console.log(`Esse usuário não existe: ${userId}`)
	}
}

export { startUserChatIdsListenerUC }
