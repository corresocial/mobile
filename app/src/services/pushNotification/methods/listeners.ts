import * as Notifications from 'expo-notifications'
import React from 'react'

function addNotificationListener(listenerReference: React.MutableRefObject<any>, responseReference: React.MutableRefObject<any>) {
	const listenerRef = listenerReference
	const responseRef = responseReference
	if (listenerRef) {
		listenerRef.current = Notifications.addNotificationReceivedListener((notification) => { })
		responseRef.current = Notifications.addNotificationResponseReceivedListener((response) => { })
	}
}

function removeNotificationListener(listenerReference: React.MutableRefObject<any>, responseReference: React.MutableRefObject<any>) {
	if (listenerReference && responseReference.current) {
		listenerReference.current?.remove()
		responseReference.current.remove()
		Notifications.unregisterForNotificationsAsync()
	}
}

export { addNotificationListener, removeNotificationListener }
