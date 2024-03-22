import { ChatRepositoryInterface } from './ChatRepositoryInterface'
import { startChatMessagesListener, startUserChatIdsListener, startUserChatListener } from './listeners/listeners'
import { addNewUserChatId } from './remoteRepository/addNewUserChatId'
import { registerNewUser } from './remoteRepository/createNewUser'
import { existsOnDatabase } from './remoteRepository/existsOnDatabase'
import { getRemoteChatData } from './remoteRepository/getRemoteChatData'
import { getRemoteUserData } from './remoteRepository/getRemoteUserData'
import { getUserChatIds } from './remoteRepository/getUserChatIds'
import { getUserChats } from './remoteRepository/getUserChats'
import { registerNewChat } from './remoteRepository/registerNewChat'
import { sendMessage } from './remoteRepository/sendMessage'
import { setChatMessages } from './remoteRepository/setChatMessages'
import { unsubscribeChatMessagesListener, unsubscribeUserChatIdsListener, unsubscribeUserChatListener } from './remoteRepository/unsubscribeListeners'
import { updateBlockedUsersList } from './remoteRepository/updateBlockUsersList'
import { updateChatCompletedState } from './remoteRepository/updateChatCompletedState'
import { updateChatMessages } from './remoteRepository/updateChatMessages'
import { updateUserChatProfilePicture } from './remoteRepository/updateUserChatProfilePicture'
import { updateUserTokenNotification } from './remoteRepository/updateUserTokenNotification'

function useChatRepository(): ChatRepositoryInterface {
	return {
		// GET
		existsOnDatabase: existsOnDatabase,
		getUserChatIds: getUserChatIds,
		getUserChats: getUserChats,
		getRemoteUserData: getRemoteUserData,
		getRemoteChatData: getRemoteChatData,

		// POST
		registerNewUser: registerNewUser,
		registerNewChat: registerNewChat,
		addNewUserChatId: addNewUserChatId,
		sendMessage: sendMessage, 			// REFACTOR Renomear para algo mais voltado para o db depois de remover useCases
		setChatMessages: setChatMessages,

		// PUT
		updateChatMessages: updateChatMessages,
		updateUserChatProfilePicture: updateUserChatProfilePicture,
		updateBlockedUsersList: updateBlockedUsersList,
		updateChatCompletedState: updateChatCompletedState,
		updateUserTokenNotification: updateUserTokenNotification,

		// DELETE

		// LISTENERS
		startUserChatIdsListener: startUserChatIdsListener,
		startUserChatListener: startUserChatListener,
		startChatMessagesListener: startChatMessagesListener,
		unsubscribeUserChatIdsListener: unsubscribeUserChatIdsListener,
		unsubscribeUserChatListener: unsubscribeUserChatListener,
		unsubscribeChatMessagesListener: unsubscribeChatMessagesListener,
	}
}

export { useChatRepository }
