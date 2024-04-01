import { getNotificationConfig } from './methods/getNotificationConfig'
import { addNotificationListener, removeNotificationListener } from './methods/listeners'
import { registerPushNotification } from './methods/registerPushNotification'
import { sendPushNotification } from './methods/sendPushNotification'
import { PushNotificationServiceInterface } from './PushNotificationServiceInterface'

function usePushNotificationService(): PushNotificationServiceInterface {
	return {
		getNotificationConfig: getNotificationConfig,
		registerPushNotification: registerPushNotification,
		sendPushNotification: sendPushNotification,
		addNotificationListener: addNotificationListener,
		removeNotificationListener: removeNotificationListener,
	}
}

export { usePushNotificationService }
