import { Chat } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function startUserChatIdsListenerUC(userId: Id, callback: (chatIds: Id[], userChats: Chat[]) => void) {
	const { existsOnDatabase, getUserChats, startUserChatIdsListener } = ChatGatewayAdapter()

	const listenerCallback = async (chatIds: Id[]) => {
		const userChats = await getUserChats(chatIds)
		callback(chatIds, userChats)
	}

	if (await existsOnDatabase(userId)) {
		startUserChatIdsListener(userId, listenerCallback)
	} else {
		console.log(`Esse usuário não existe: ${userId}`)
	}
}

export { startUserChatIdsListenerUC }
