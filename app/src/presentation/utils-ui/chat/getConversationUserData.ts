import { ChatUserIdentification } from '@domain/chat/entity/types'

import { Id } from '@globalTypes/global/types'

function getConversationUserName(currentUserId: Id, user1: ChatUserIdentification, user2: ChatUserIdentification) {
	return currentUserId === user1.userId ? user2.name : user1.name
}

function getConversationUserId(currentUserId: Id, user1: ChatUserIdentification, user2: ChatUserIdentification) {
	return currentUserId === user1.userId ? user2.userId : user1.userId
}

function getConversationProfilePicture(currentUserId: Id, user1: ChatUserIdentification, user2: ChatUserIdentification) {
	return currentUserId === user1.userId ? user2.profilePictureUrl : user1.profilePictureUrl
}

export { getConversationUserName, getConversationUserId, getConversationProfilePicture }
