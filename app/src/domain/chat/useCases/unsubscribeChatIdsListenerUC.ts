import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

function unsubscribeChatIdsListenerUC(userId: Id) {
	const { unsubscribeUserChatIdsListener } = ChatGatewayAdapter()

	if (!userId) return
	try {
		unsubscribeUserChatIdsListener(userId)
	} catch (err) {
		console.log(err)
	}
}

export { unsubscribeChatIdsListenerUC }
