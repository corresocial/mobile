import { conversationsIsValidToSortUC } from '@domain/chat/rules/validation'
import { createNewUserUC } from '@domain/chat/useCases/createNewUserUC'
import { existsOnDatabaseUC } from '@domain/chat/useCases/existsOnDatabaseUC'
import { filterInvalidMessagesUC } from '@domain/chat/useCases/filterInvalidMessagesUC'
import { getRemoteUserDataUC } from '@domain/chat/useCases/getRemoteUserDataUC'
import { getUserChatIdsUC } from '@domain/chat/useCases/getUserChatIdsUC'
import { getUserChatsUC } from '@domain/chat/useCases/getUserChatsUC'
import { hasBlockedUserOnConversationUC } from '@domain/chat/useCases/hasBlockedUserOnConversationUC'
import { addNotificationListenerUC, removeNotificationListenerUC } from '@domain/chat/useCases/notificationListeners'
import { registerPushNotificationUC } from '@domain/chat/useCases/registerPushNotification'
import { startUserChatIdsListenerUC } from '@domain/chat/useCases/startUserChatIdsListenerUC'
import { startUserChatListenersUC } from '@domain/chat/useCases/startUserChatListenersUC'
import { unsubscribeChatIdsListenerUC } from '@domain/chat/useCases/unsubscribeChatIdsListenerUC'
import { unsubscribeUserChatsListenerUC } from '@domain/chat/useCases/unsubscribeUserChatsListenerUC'
import { updateUserTokenNotificationUC } from '@domain/chat/useCases/updateUserTokenNotificationUC'

import { ChatAdapterInterface } from './ChatAdapterInterface'

function ChatAdapter(): ChatAdapterInterface {
	return {
		createNewUser: createNewUserUC,
		getUserChatIds: getUserChatIdsUC,
		getUserChats: getUserChatsUC,
		getRemoteUserData: getRemoteUserDataUC,
		existsOnDatabase: existsOnDatabaseUC,
		startUserChatIdsListener: startUserChatIdsListenerUC,
		startUserChatListeners: startUserChatListenersUC,
		unsubscribeUserChatIdsListener: unsubscribeChatIdsListenerUC,
		unsubscribeUserChatsListener: unsubscribeUserChatsListenerUC,
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
