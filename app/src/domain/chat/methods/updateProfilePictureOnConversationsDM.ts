import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function updateProfilePictureOnConversationsDM(userId: Id, profilePictureUrl: string) {
	const { getUserChatIds, getRemoteChatData, updateUserChatProfilePicture } = useChatRepository()

	try {
		const userChatIds = await getUserChatIds(userId)
		console.log(userChatIds)

		return userChatIds.forEach(async (chatId) => {
			const chatData = await getRemoteChatData(chatId)

			if (chatData.user1.userId === userId && chatData.user1.profilePictureUrl !== profilePictureUrl) {
				chatData.user1.profilePictureUrl = profilePictureUrl
				return updateUserChatProfilePicture(chatId, { user1: chatData.user1, user2: chatData.user2 })
			}

			if (chatData.user2.userId === userId && chatData.user2.profilePictureUrl !== profilePictureUrl) {
				chatData.user2.profilePictureUrl = profilePictureUrl
				return updateUserChatProfilePicture(chatId, { user1: chatData.user1, user2: chatData.user2 })
			}
		})
	} catch (err) {
		console.log(err)
	}
}

export { updateProfilePictureOnConversationsDM }
