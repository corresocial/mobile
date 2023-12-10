import { defaultMessageObject, getLastMessageObject, sortChatMessages } from '.'
import { getConversationProfilePicture, getConversationUserId, getConversationUserName } from './getConversationUserData'
import { UiChatUtilsInterface } from './UiChatUtilsInterface'

function UiChatUtils(): UiChatUtilsInterface {
	return {
		defaultMessageObject,
		getLastMessageObject,
		sortChatMessages,
		getConversationUserName,
		getConversationUserId,
		getConversationProfilePicture
	}
}

export { UiChatUtils }
