import { ChatDomainInterface } from './ChatDomainInterface'
import { conversationsIsValidToSortUC } from './core/validation'
import { blockUserByIdUC } from './methods/blockUserByIdUC'
import { chatUserHasTokenNotificationUC } from './methods/chatUserHasTokenNotificationUC'
import { cleanChatMessagesUC } from './methods/cleanChatMessagesUC'
import { createNewUserUC } from './methods/createNewUserUC'
import { existsOnDatabaseUC } from './methods/existsOnDatabaseUC'
import { filterInvalidMessagesUC } from './methods/filterInvalidMessagesUC'
import { generateNewMessageObjectUC } from './methods/generateNewMessageObjectUC'
import { getRemoteChatDataByUserUC } from './methods/getRemoteChatDataByUserUC'
import { getRemoteUserDataUC } from './methods/getRemoteUserDataUC'
import { getUserChatIdsUC } from './methods/getUserChatIdsUC'
import { getUserChatsUC } from './methods/getUserChatsUC'
import { hasBlockedUserOnConversationUC } from './methods/hasBlockedUserOnConversationUC'
import { makeAllUserMessagesAsReadUC } from './methods/makeAllMessagesAsReadUC'
import { addNotificationListenerUC, removeNotificationListenerUC } from './methods/notificationListenersUC'
import { registerNewChatUC } from './methods/registerNewChatUC'
import { registerPushNotificationUC } from './methods/registerPushNotificationUC'
import { sendMessageUC } from './methods/sendMessageUC'
import { setChatIdForUsersUC } from './methods/setChatIdForUsersUC'
import { startUserChatIdsListenerUC } from './methods/startUserChatIdsListenerUC'
import { startUserChatListenersUC } from './methods/startUserChatListenersUC'
import { unblockUserByIdUC } from './methods/unblockUserByIdUC'
import { unsubscribeChatIdsListenerUC } from './methods/unsubscribeChatIdsListenerUC'
import { unsubscribeChatMessagesListenerUC } from './methods/unsubscribeChatMessagesListenerUC'
import { unsubscribeUserChatsListenerUC } from './methods/unsubscribeUserChatsListenerUC'
import { updateChatCompletedStateUC } from './methods/updateChatCompletedStateUC'
import { updateProfilePictureOnConversationsUC } from './methods/updateProfilePictureOnConversations'
import { updateUserTokenNotificationUC } from './methods/updateUserTokenNotificationUC'

function useChatDomain(): ChatDomainInterface {
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

export { useChatDomain }
