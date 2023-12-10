import { addNewUserChatId } from '../chat/addNewUserChatId'
import { registerNewUser } from '../chat/createNewUser'
import { existsOnDatabase } from '../chat/existsOnDatabase'
import { getRemoteChatData } from '../chat/getRemoteChatData'
import { getRemoteUserData } from '../chat/getRemoteUserData'
import { getUserChatIds } from '../chat/getUserChatIds'
import { getUserChats } from '../chat/getUserChats'
import { startChatMessagesListener, startUserChatIdsListener, startUserChatListener } from '../chat/listeners'
import { registerNewChat } from '../chat/registerNewChat'
import { sendMessage } from '../chat/sendMessage'
import { unsubscribeChatMessagesListener, unsubscribeUserChatIdsListener, unsubscribeUserChatListener } from '../chat/unsubscribeListeners'
import { updateBlockedUsersList } from '../chat/updateBlockUsersList'
import { updateUserTokenNotification } from '../chat/updateUserTokenNotification'
import { ChatGatewayAdapterInterface } from './ChatGatewayAdapterInterface'

function ChatGatewayAdapter(): ChatGatewayAdapterInterface {
	return {
		getUserChatIds,
		getUserChats,
		getRemoteUserData,
		getRemoteChatData,
		registerNewUser,
		registerNewChat,
		addNewUserChatId,
		sendMessage,
		existsOnDatabase,
		updateBlockedUsersList,
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
