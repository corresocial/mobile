import { defaultMessageObject, getLastMessageObject, sortChatMessages } from '.'
import { UiChatUtilsInterface } from './UiChatUtilsInterface'
import { getConversationProfilePicture, getConversationUserId, getConversationUserName } from './getConversationUserData'

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
