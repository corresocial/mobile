import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

function unsubscribeUserChatsListenerDM(chatIds: Id[]) {
	const { unsubscribeUserChatListener } = useChatRepository()

	if (!chatIds || !chatIds.length) return
	try {
		chatIds.forEach((chatId) => {
			unsubscribeUserChatListener(chatId)
		})
	} catch (err) {
		console.log(err)
	}
}

export { unsubscribeUserChatsListenerDM }
