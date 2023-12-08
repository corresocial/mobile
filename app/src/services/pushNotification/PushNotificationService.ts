import { addNotificationListener, removeNotificationListener } from './methods/listeners'
import { registerPushNotification } from './methods/registerPushNotification'
import { PushNotificationServiceInterface } from './PushNotificationServiceInterface'

function PushNotificationService(): PushNotificationServiceInterface {
	return {
		registerPushNotification,
		addNotificationListener,
		removeNotificationListener
	}
}

export { PushNotificationService }
