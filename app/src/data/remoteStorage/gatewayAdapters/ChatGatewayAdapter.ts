import { registerNewUser } from '../chat/createNewUser'
import { ChatGatewayAdapterInterface } from './ChatGatewayAdapterInterface'

function ChatGatewayAdapter(): ChatGatewayAdapterInterface {
	return {
		registerNewUser
	}
}

export { ChatGatewayAdapter }
