import { isArray } from 'lodash'

import { Chat } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function startUserChatIdsListenerDM(userId: Id, callback: (chatIds: Id[], userChats: Chat[]) => void) {
	const { existsOnDatabase, getUserChats, startUserChatIdsListener } = useChatRepository()

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

export { startUserChatIdsListenerDM }
