/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
import * as Application from 'expo-application'
import { Platform } from 'react-native'

import { trackEvent } from '@aptabase/react-native'

type EventName = 'opened_app' | 'opened_auth_screen' | 'user_authed' | 'user_posted' | 'chat_started' | 'reported_impact' | 'user_opened_screen' | 'user_subscribed' | 'smas_search' | 'recovery_nis'

interface EventObject extends Record<string, string | number | boolean | undefined> {
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
	smasResponse?: 'success' | 'failed' | 'not_found'
	smasService?: 'BEE' | 'PBF' | 'CADUNICO' | 'ANONIMIZADO' | undefined
}

function sendEvent(eventName: EventName, value: EventObject, sendWithDeviceId?: boolean) {
	try {
		if (__DEV__) return

		const eventData = value
		if (sendWithDeviceId && Platform.OS === 'android') {
			eventData.deviceId = Application.androidId as string
		}
		eventData.appVersion = Application.nativeBuildVersion as string
		trackEvent(eventName, eventData as any)
	} catch (error) {
		console.log('Erro ao enviar analytics para o Aptabase')
		console.log(error)
	}
}

export { sendEvent }
