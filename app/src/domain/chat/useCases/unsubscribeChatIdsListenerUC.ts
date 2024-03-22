import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

function unsubscribeChatIdsListenerUC(userId: Id) {
	const { unsubscribeUserChatIdsListener } = useChatRepository()

	if (!userId) return
	try {
		unsubscribeUserChatIdsListener(userId)
	} catch (err) {
		console.log(err)
	}
}

export { unsubscribeChatIdsListenerUC }
