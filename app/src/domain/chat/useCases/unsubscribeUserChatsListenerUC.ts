import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

function unsubscribeUserChatsListenerUC(chatIds: Id[]) {
	const { unsubscribeUserChatListener } = ChatGatewayAdapter()

	if (!chatIds || !chatIds.length) return
	try {
		chatIds.forEach((chatId) => {
			unsubscribeUserChatListener(chatId)
		})
	} catch (err) {
		console.log(err)
	}
}

export { unsubscribeUserChatsListenerUC }
