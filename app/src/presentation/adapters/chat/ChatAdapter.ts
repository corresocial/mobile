import { conversationsIsValidToSortUC } from '@domain/chat/core/validation'
import { blockUserByIdUC } from '@domain/chat/methods/blockUserByIdUC'
import { chatUserHasTokenNotificationUC } from '@domain/chat/methods/chatUserHasTokenNotificationUC'
import { cleanChatMessagesUC } from '@domain/chat/methods/cleanChatMessagesUC'
import { createNewUserUC } from '@domain/chat/methods/createNewUserUC'
import { existsOnDatabaseUC } from '@domain/chat/methods/existsOnDatabaseUC'
import { filterInvalidMessagesUC } from '@domain/chat/methods/filterInvalidMessagesUC'
import { generateNewMessageObjectUC } from '@domain/chat/methods/generateNewMessageObjectUC'
import { getRemoteChatDataByUserUC } from '@domain/chat/methods/getRemoteChatDataByUserUC'
import { getRemoteUserDataUC } from '@domain/chat/methods/getRemoteUserDataUC'
import { getUserChatIdsUC } from '@domain/chat/methods/getUserChatIdsUC'
import { getUserChatsUC } from '@domain/chat/methods/getUserChatsUC'
import { hasBlockedUserOnConversationUC } from '@domain/chat/methods/hasBlockedUserOnConversationUC'
import { makeAllUserMessagesAsReadUC } from '@domain/chat/methods/makeAllMessagesAsReadUC'
import { addNotificationListenerUC, removeNotificationListenerUC } from '@domain/chat/methods/notificationListenersUC'
import { registerNewChatUC } from '@domain/chat/methods/registerNewChatUC'
import { registerPushNotificationUC } from '@domain/chat/methods/registerPushNotificationUC'
import { sendMessageUC } from '@domain/chat/methods/sendMessageUC'
import { setChatIdForUsersUC } from '@domain/chat/methods/setChatIdForUsersUC'
import { startUserChatIdsListenerUC } from '@domain/chat/methods/startUserChatIdsListenerUC'
import { startUserChatListenersUC } from '@domain/chat/methods/startUserChatListenersUC'
import { unblockUserByIdUC } from '@domain/chat/methods/unblockUserByIdUC'
import { unsubscribeChatIdsListenerUC } from '@domain/chat/methods/unsubscribeChatIdsListenerUC'
import { unsubscribeChatMessagesListenerUC } from '@domain/chat/methods/unsubscribeChatMessagesListenerUC'
import { unsubscribeUserChatsListenerUC } from '@domain/chat/methods/unsubscribeUserChatsListenerUC'
import { updateChatCompletedStateUC } from '@domain/chat/methods/updateChatCompletedStateUC'
import { updateProfilePictureOnConversationsUC } from '@domain/chat/methods/updateProfilePictureOnConversations'
import { updateUserTokenNotificationUC } from '@domain/chat/methods/updateUserTokenNotificationUC'

import { ChatAdapterInterface } from './ChatAdapterInterface'

function ChatAdapter(): ChatAdapterInterface {
	return {
		existsOnDatabase: existsOnDatabaseUC,
		getUserChatIds: getUserChatIdsUC,
		getUserChats: getUserChatsUC,
		getRemoteUserData: getRemoteUserDataUC,
		getRemoteChatDataByUser: getRemoteChatDataByUserUC,
		createNewUser: createNewUserUC,
		registerNewChat: registerNewChatUC,
		setChatIdForUsers: setChatIdForUsersUC,
		generateNewMessageObject: generateNewMessageObjectUC,
		sendMessage: sendMessageUC,
		cleanChatMessages: cleanChatMessagesUC,
		makeAllUserMessagesAsRead: makeAllUserMessagesAsReadUC,
		updateProfilePictureOnConversations: updateProfilePictureOnConversationsUC,
		updateChatCompletedState: updateChatCompletedStateUC,
		blockUserById: blockUserByIdUC,
		unblockUserById: unblockUserByIdUC,
		startUserChatIdsListener: startUserChatIdsListenerUC,
		startUserChatListeners: startUserChatListenersUC,
		unsubscribeUserChatIdsListener: unsubscribeChatIdsListenerUC,
		unsubscribeUserChatsListener: unsubscribeUserChatsListenerUC,
		unsubscribeChatMessagesListener: unsubscribeChatMessagesListenerUC,
		chatUserHasTokenNotification: chatUserHasTokenNotificationUC,
		updateUserTokenNotification: updateUserTokenNotificationUC,
		hasBlockedUserOnConversation: hasBlockedUserOnConversationUC,

		registerPushNotification: registerPushNotificationUC,
		addNotificationListener: addNotificationListenerUC,
		removeNotificationListener: removeNotificationListenerUC,

		filterInvalidMessages: filterInvalidMessagesUC,
		conversationsIsValidToSort: conversationsIsValidToSortUC,
	}
}

export { ChatAdapter }
