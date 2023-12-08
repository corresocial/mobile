import { MutableObjectReference } from '@services/pushNotification/types'

import { addNotificationListener, removeNotificationListener } from '@services/pushNotification/methods/listeners'

function addNotificationListenerUC(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>) {
	addNotificationListener(listenerReference, responseReference)
}

function removeNotificationListenerUC(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>) {
	removeNotificationListener(listenerReference, responseReference)
}

export { addNotificationListenerUC, removeNotificationListenerUC }
