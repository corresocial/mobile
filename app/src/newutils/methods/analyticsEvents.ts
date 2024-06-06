import * as Application from 'expo-application'
import { Platform } from 'react-native'

import { trackEvent } from '@aptabase/react-native'

type EventName = 'opened_app' | 'opened_auth_screen' | 'user_authed' | 'user_posted' | 'chat_started' | 'reported_impact' | 'user_opened_screen' | 'user_subscribed'

interface EventObject extends Record<string, string | number | boolean | undefined>{
	// deviceId?: string
	userId?: string
	authType?: 'login' | 'register'
	postType?: 'culture' | 'income' | 'socialImpact' 
	impactReportType?: 'culture' | 'income' | 'socialImpact' | 'chat'
	chatType?: 'profile' | 'post'
	screenName?: string
	subscriptionType?: 'paid' | 'free'
	subscriptionRange?: 'city' | 'country' | 'near'
	impactReportValue?: number
	deviceId?: string
	appVersion?: string
}

function sendEvent(eventName: EventName, value: EventObject, sendWithDeviceId?: boolean) {
	const eventData = value
	if (sendWithDeviceId && Platform.OS === 'android') {
		eventData.deviceId = Application.androidId as string
	}
	eventData.appVersion = Application.nativeBuildVersion as string
	trackEvent(eventName, eventData as any)
} 

export { sendEvent }
