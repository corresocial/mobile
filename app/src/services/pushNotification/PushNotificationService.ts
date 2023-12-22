import { getNotificationConfig } from './methods/getNotificationConfig'
import { addNotificationListener, removeNotificationListener } from './methods/listeners'
import { registerPushNotification } from './methods/registerPushNotification'
import { sendPushNotification } from './methods/sendPushNotification'
import { PushNotificationServiceInterface } from './PushNotificationServiceInterface'

function PushNotificationService(): PushNotificationServiceInterface {
	return {
		getNotificationConfig,
		registerPushNotification,
		sendPushNotification,
		addNotificationListener,
		removeNotificationListener,
	}
}

export { PushNotificationService }
