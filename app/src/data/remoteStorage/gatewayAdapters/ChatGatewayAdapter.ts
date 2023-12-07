import { registerNewUser } from '../chat/createNewUser'
import { existsOnDatabase } from '../chat/existsOnDatabase'
import { getRemoteUserData } from '../chat/getRemoteUserData'
import { getUserChatIds } from '../chat/getUserChatIds'
import { getUserChats } from '../chat/getUserChats'
import { startUserChatIdsListener, startUserChatListeners } from '../chat/listeners'
import { updateUserTokenNotification } from '../chat/updateUserTokenNotification'
import { ChatGatewayAdapterInterface } from './ChatGatewayAdapterInterface'

function ChatGatewayAdapter(): ChatGatewayAdapterInterface {
	return {
		registerNewUser,
		getUserChatIds,
		getUserChats,
		getRemoteUserData,
		existsOnDatabase,
		startUserChatIdsListener,
		startUserChatListeners,
		updateUserTokenNotification
	}
}

export { ChatGatewayAdapter }
