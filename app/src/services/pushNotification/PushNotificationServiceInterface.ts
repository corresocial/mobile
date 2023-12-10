import { Id } from '@domain/entities/globalTypes'

import { MutableObjectReference, NotificationMessageConfig } from '@services/pushNotification/types'

interface PushNotificationServiceInterface {
	getNotificationConfig(tokenNotification: Id, title: string, textMessage: string): NotificationMessageConfig
	registerPushNotification(): Promise<string>
	sendPushNotification(notificationMessage: NotificationMessageConfig): Promise<boolean>
	addNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void
	removeNotificationListener(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>): void
}

export { PushNotificationServiceInterface }
