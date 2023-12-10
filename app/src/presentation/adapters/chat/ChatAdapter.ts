import { conversationsIsValidToSortUC } from '@domain/chat/rules/validation'
import { blockUserByIdUC } from '@domain/chat/useCases/blockUserByIdUC'
import { createNewUserUC } from '@domain/chat/useCases/createNewUserUC'
import { existsOnDatabaseUC } from '@domain/chat/useCases/existsOnDatabaseUC'
import { filterInvalidMessagesUC } from '@domain/chat/useCases/filterInvalidMessagesUC'
import { generateNewMessageObjectUC } from '@domain/chat/useCases/generateNewMessageObjectUC'
import { getRemoteChatDataByUserUC } from '@domain/chat/useCases/getRemoteChatDataByUserUC'
import { getRemoteUserDataUC } from '@domain/chat/useCases/getRemoteUserDataUC'
import { getUserChatIdsUC } from '@domain/chat/useCases/getUserChatIdsUC'
import { getUserChatsUC } from '@domain/chat/useCases/getUserChatsUC'
import { hasBlockedUserOnConversationUC } from '@domain/chat/useCases/hasBlockedUserOnConversationUC'
import { addNotificationListenerUC, removeNotificationListenerUC } from '@domain/chat/useCases/notificationListenersUC'
import { registerNewChatUC } from '@domain/chat/useCases/registerNewChatUC'
import { registerPushNotificationUC } from '@domain/chat/useCases/registerPushNotificationUC'
import { sendMessageUC } from '@domain/chat/useCases/sendMessageUC'
import { setChatIdForUsersUC } from '@domain/chat/useCases/setChatIdForUsersUC'
import { startChatMessagesListenerUC } from '@domain/chat/useCases/startMessagesListenerUC'
import { startUserChatIdsListenerUC } from '@domain/chat/useCases/startUserChatIdsListenerUC'
import { startUserChatListenersUC } from '@domain/chat/useCases/startUserChatListenersUC'
import { unblockUserByIdUC } from '@domain/chat/useCases/unblockUserByIdUC'
import { unsubscribeChatIdsListenerUC } from '@domain/chat/useCases/unsubscribeChatIdsListenerUC'
import { unsubscribeChatMessagesListenerUC } from '@domain/chat/useCases/unsubscribeChatMessagesListenerUC'
import { unsubscribeUserChatsListenerUC } from '@domain/chat/useCases/unsubscribeUserChatsListenerUC'
import { updateUserTokenNotificationUC } from '@domain/chat/useCases/updateUserTokenNotificationUC'

import { ChatAdapterInterface } from './ChatAdapterInterface'

function ChatAdapter(): ChatAdapterInterface {
	return {
		getUserChatIds: getUserChatIdsUC,
		getUserChats: getUserChatsUC,
		getRemoteUserData: getRemoteUserDataUC,
		getRemoteChatDataByUser: getRemoteChatDataByUserUC,
		createNewUser: createNewUserUC,
		registerNewChat: registerNewChatUC,
		setChatIdForUsers: setChatIdForUsersUC,
		generateNewMessageObject: generateNewMessageObjectUC,
		sendMessage: sendMessageUC,
		existsOnDatabase: existsOnDatabaseUC,
		blockUserById: blockUserByIdUC,
		unblockUserById: unblockUserByIdUC,
		startUserChatIdsListener: startUserChatIdsListenerUC,
		startUserChatListeners: startUserChatListenersUC,
		startChatMessagesListener: startChatMessagesListenerUC,
		unsubscribeUserChatIdsListener: unsubscribeChatIdsListenerUC,
		unsubscribeUserChatsListener: unsubscribeUserChatsListenerUC,
		unsubscribeChatMessagesListener: unsubscribeChatMessagesListenerUC,
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
