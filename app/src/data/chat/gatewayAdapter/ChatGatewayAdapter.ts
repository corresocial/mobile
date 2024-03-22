import { addNewUserChatId } from '../addNewUserChatId'
import { registerNewUser } from '../createNewUser'
import { existsOnDatabase } from '../existsOnDatabase'
import { getRemoteChatData } from '../getRemoteChatData'
import { getRemoteUserData } from '../getRemoteUserData'
import { getUserChatIds } from '../getUserChatIds'
import { getUserChats } from '../getUserChats'
import { startChatMessagesListener, startUserChatIdsListener, startUserChatListener } from '../listeners'
import { registerNewChat } from '../registerNewChat'
import { sendMessage } from '../sendMessage'
import { setChatMessages } from '../setChatMessages'
import { unsubscribeChatMessagesListener, unsubscribeUserChatIdsListener, unsubscribeUserChatListener } from '../unsubscribeListeners'
import { updateBlockedUsersList } from '../updateBlockUsersList'
import { updateChatCompletedState } from '../updateChatCompletedState'
import { updateChatMessages } from '../updateChatMessages'
import { updateUserChatProfilePicture } from '../updateUserChatProfilePicture'
import { updateUserTokenNotification } from '../updateUserTokenNotification'
import { ChatGatewayAdapterInterface } from './ChatGatewayAdapterInterface'

function ChatGatewayAdapter(): ChatGatewayAdapterInterface {
	return {
		existsOnDatabase,
		getUserChatIds,
		getUserChats,
		getRemoteUserData,
		getRemoteChatData,
		registerNewUser,
		registerNewChat,
		addNewUserChatId,
		sendMessage,
		setChatMessages,
		updateChatMessages,
		updateUserChatProfilePicture,
		updateBlockedUsersList,
		updateChatCompletedState,
		startUserChatIdsListener,
		startUserChatListener,
		startChatMessagesListener,
		unsubscribeUserChatIdsListener,
		unsubscribeUserChatListener,
		unsubscribeChatMessagesListener,
		updateUserTokenNotification
	}
}

export { ChatGatewayAdapter }
