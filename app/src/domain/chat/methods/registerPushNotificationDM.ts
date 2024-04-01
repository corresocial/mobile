import { usePushNotificationService } from '@services/pushNotification/usePushNotificationService'

async function registerPushNotificationDM() {
	const { registerPushNotification } = usePushNotificationService()

	return registerPushNotification()
}

export { registerPushNotificationDM }
