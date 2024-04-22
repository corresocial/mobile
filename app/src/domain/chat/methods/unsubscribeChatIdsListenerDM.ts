import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

function unsubscribeChatIdsListenerDM(userId: Id) {
	const { unsubscribeUserChatIdsListener } = useChatRepository()

	if (!userId) return
	try {
		unsubscribeUserChatIdsListener(userId)
	} catch (err) {
		console.log(err)
	}
}

export { unsubscribeChatIdsListenerDM }
