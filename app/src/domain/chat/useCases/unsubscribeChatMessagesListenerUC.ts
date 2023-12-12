import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

function unsubscribeChatMessagesListenerUC(chatId: Id) {
	const { unsubscribeChatMessagesListener } = ChatGatewayAdapter()

	try {
		unsubscribeChatMessagesListener(chatId)
	} catch (err) {
		console.log(err)
	}
}

export { unsubscribeChatMessagesListenerUC }
