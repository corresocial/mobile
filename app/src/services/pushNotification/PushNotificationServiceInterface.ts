import { MutableObjectReference } from '@services/pushNotification/types'

interface PushNotificationServiceInterface {
	registerPushNotification(): Promise<string>
	addNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void
	removeNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void
}

export { PushNotificationServiceInterface }
