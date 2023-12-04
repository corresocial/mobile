import { UiChatUtilsInterface } from './UiChatUtilsInterface'

import { defaultMessageObject, getLastMessageObjects, sortChatMessages } from '.'

function UiChatUtils(): UiChatUtilsInterface {
	return {
		defaultMessageObject,
		getLastMessageObjects,
		sortChatMessages
	}
}

export { UiChatUtils }
