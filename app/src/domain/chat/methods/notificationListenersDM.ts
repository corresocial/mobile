import { MutableObjectReference } from '@services/pushNotification/types'

import { addNotificationListener, removeNotificationListener } from '@services/pushNotification/methods/listeners'

function addNotificationListenerDM(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>) {
	addNotificationListener(listenerReference, responseReference)
}

function removeNotificationListenerDM(listenerReference: MutableObjectReference<any>, responseReference: MutableObjectReference<any>) {
	removeNotificationListener(listenerReference, responseReference)
}

export { addNotificationListenerDM, removeNotificationListenerDM }
