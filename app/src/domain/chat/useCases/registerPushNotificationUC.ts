import { PushNotificationService } from '@services/pushNotification/PushNotificationService'

async function registerPushNotificationUC() {
	const { registerPushNotification } = PushNotificationService()

	return registerPushNotification()
}

export { registerPushNotificationUC }
