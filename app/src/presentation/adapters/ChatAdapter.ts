import { conversationsIsValidToSortUC } from "@domain/chat/rules/validation"
import { ChatAdapterInterface } from "./ChatAdapterInterface"
import { filterInvalidMessagesUC } from "@domain/chat/useCases/filterInvalidMessages"
import { createNewUserUC } from "@domain/chat/useCases/createNewUser"

function ChatAdapter(): ChatAdapterInterface {
	return {
		createNewUser: createNewUserUC,
		filterInvalidMessages: filterInvalidMessagesUC,
		conversationsIsValidToSort: conversationsIsValidToSortUC
	}
}

export { ChatAdapter }


