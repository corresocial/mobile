import { usePushNotificationService } from '@services/pushNotification/usePushNotificationService'

async function registerPushNotificationUC() {
	const { registerPushNotification } = usePushNotificationService()

	return registerPushNotification()
}

export { registerPushNotificationUC }
