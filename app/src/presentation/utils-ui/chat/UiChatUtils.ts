import { defaultMessageObject, getLastMessageObjects, sortChatMessages } from '.'
import { UiChatUtilsInterface } from './UiChatUtilsInterface'

function UiChatUtils(): UiChatUtilsInterface {
	return {
		defaultMessageObject,
		getLastMessageObjects,
		sortChatMessages
	}
}

export { UiChatUtils }
