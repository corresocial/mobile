import { ChatDomainInterface } from './ChatDomainInterface'
import { conversationsIsValidToSortDM } from './core/validation'
import { blockUserByIdDM } from './methods/blockUserByIdDM'
import { chatUserHasTokenNotificationDM } from './methods/chatUserHasTokenNotificationDM'
import { cleanChatMessagesDM } from './methods/cleanChatMessagesDM'
import { createNewUserDM } from './methods/createNewUserDM'
import { existsOnDatabaseDM } from './methods/existsOnDatabaseDM'
import { filterInvalidMessagesDM } from './methods/filterInvalidMessagesDM'
import { generateNewMessageObjectDM } from './methods/generateNewMessageObjectDM'
import { getRemoteChatDataByUserDM } from './methods/getRemoteChatDataByUserDM'
import { getRemoteUserDataDM } from './methods/getRemoteUserDataDM'
import { getUserChatIdsDM } from './methods/getUserChatIdsDM'
import { getUserChatsDM } from './methods/getUserChatsDM'
import { hasBlockedUserOnConversationDM } from './methods/hasBlockedUserOnConversationDM'
import { makeAllUserMessagesAsReadDM } from './methods/makeAllMessagesAsReadDM'
import { addNotificationListenerDM, removeNotificationListenerDM } from './methods/notificationListenersDM'
import { registerNewChatDM } from './methods/registerNewChatDM'
import { registerPushNotificationDM } from './methods/registerPushNotificationDM'
import { sendMessageDM } from './methods/sendMessageDM'
import { setChatIdForUsersDM } from './methods/setChatIdForUsersDM'
import { startUserChatIdsListenerDM } from './methods/startUserChatIdsListenerDM'
import { startUserChatListenersDM } from './methods/startUserChatListenersDM'
import { unblockUserByIdDM } from './methods/unblockUserByIdDM'
import { unsubscribeChatIdsListenerDM } from './methods/unsubscribeChatIdsListenerDM'
import { unsubscribeChatMessagesListenerDM } from './methods/unsubscribeChatMessagesListenerDM'
import { unsubscribeUserChatsListenerDM } from './methods/unsubscribeUserChatsListenerDM'
import { updateChatCompletedStateDM } from './methods/updateChatCompletedStateDM'
import { updateProfilePictureOnConversationsDM } from './methods/updateProfilePictureOnConversationsDM'
import { updateUserTokenNotificationDM } from './methods/updateUserTokenNotificationDM'

function useChatDomain(): ChatDomainInterface {
	return {
		existsOnDatabase: existsOnDatabaseDM,
		getUserChatIds: getUserChatIdsDM,
		getUserChats: getUserChatsDM,
		getRemoteUserData: getRemoteUserDataDM,
		getRemoteChatDataByUser: getRemoteChatDataByUserDM,
		createNewUser: createNewUserDM,
		registerNewChat: registerNewChatDM,
		setChatIdForUsers: setChatIdForUsersDM,
		generateNewMessageObject: generateNewMessageObjectDM,
		sendMessage: sendMessageDM,
		cleanChatMessages: cleanChatMessagesDM,
		makeAllUserMessagesAsRead: makeAllUserMessagesAsReadDM,
		updateProfilePictureOnConversations: updateProfilePictureOnConversationsDM,
		updateChatCompletedState: updateChatCompletedStateDM,
		blockUserById: blockUserByIdDM,
		unblockUserById: unblockUserByIdDM,
		startUserChatIdsListener: startUserChatIdsListenerDM,
		startUserChatListeners: startUserChatListenersDM,
		unsubscribeUserChatIdsListener: unsubscribeChatIdsListenerDM,
		unsubscribeUserChatsListener: unsubscribeUserChatsListenerDM,
		unsubscribeChatMessagesListener: unsubscribeChatMessagesListenerDM,
		chatUserHasTokenNotification: chatUserHasTokenNotificationDM,
		updateUserTokenNotification: updateUserTokenNotificationDM,
		hasBlockedUserOnConversation: hasBlockedUserOnConversationDM,

		registerPushNotification: registerPushNotificationDM,
		addNotificationListener: addNotificationListenerDM,
		removeNotificationListener: removeNotificationListenerDM,

		filterInvalidMessages: filterInvalidMessagesDM,
		conversationsIsValidToSort: conversationsIsValidToSortDM,
	}
}

export { useChatDomain }
