import { conversationsIsValidToSortUC } from '@domain/chat/rules/validation'
import { createNewUserUC } from '@domain/chat/useCases/createNewUserUC'
import { existsOnDatabaseUC } from '@domain/chat/useCases/existsOnDatabaseUC'
import { filterInvalidMessagesUC } from '@domain/chat/useCases/filterInvalidMessagesUC'
import { getRemoteUserDataUC } from '@domain/chat/useCases/getRemoteUserDataUC'
import { getUserChatIdsUC } from '@domain/chat/useCases/getUserChatIdsUC'
import { getUserChatsUC } from '@domain/chat/useCases/getUserChatsUC'
import { startUserChatIdsListenerUC } from '@domain/chat/useCases/startUserChatIdsListenerUC'
import { startUserChatListenersUC } from '@domain/chat/useCases/startUserChatListeners'
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
		updateUserTokenNotification: updateUserTokenNotificationUC,

		filterInvalidMessages: filterInvalidMessagesUC,
		conversationsIsValidToSort: conversationsIsValidToSortUC,
	}
}

export { ChatAdapter }
