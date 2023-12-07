import { registerNewUser } from '../chat/createNewUser'
import { getRemoteUserData } from '../chat/getRemoteUserData'
import { getUserChatIds } from '../chat/getUserChatIds'
import { getUserChats } from '../chat/getUserChats'
import { ChatGatewayAdapterInterface } from './ChatGatewayAdapterInterface'

function ChatGatewayAdapter(): ChatGatewayAdapterInterface {
	return {
		registerNewUser,
		getUserChatIds,
		getUserChats,
		getRemoteUserData
	}
}

export { ChatGatewayAdapter }
