import { conversationsIsValidToSortUC } from '@domain/chat/rules/validation'
import { createNewUserUC } from '@domain/chat/useCases/createNewUserUC'
import { filterInvalidMessagesUC } from '@domain/chat/useCases/filterInvalidMessagesUC'
import { getRemoteUserDataUC } from '@domain/chat/useCases/getRemoteUserDataUC'
import { getUserChatIdsUC } from '@domain/chat/useCases/getUserChatIdsUC'
import { getUserChatsUC } from '@domain/chat/useCases/getUserChatsUC'

import { ChatAdapterInterface } from './ChatAdapterInterface'

function ChatAdapter(): ChatAdapterInterface {
	return {
		createNewUser: createNewUserUC,
		getUserChatIds: getUserChatIdsUC,
		getUserChats: getUserChatsUC,
		filterInvalidMessages: filterInvalidMessagesUC,
		conversationsIsValidToSort: conversationsIsValidToSortUC,
		getRemoteUserData: getRemoteUserDataUC
	}
}

export { ChatAdapter }
