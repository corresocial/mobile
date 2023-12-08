import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Alert, Platform } from 'react-native'

import { getEnvVars } from '@infrastructure/environment'

const { ENVIRONMENT } = getEnvVars()

async function registerPushNotification() {
	try {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		})

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			})
		}

		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync()

			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}

			if (finalStatus !== 'granted') {
				console.log('não permitiu notificações')
				return ''
			}

			const tokenNotification = (await Notifications.getExpoPushTokenAsync()).data
			return tokenNotification
		}

		return ''
	} catch (err: any) {
		console.log(err)
		ENVIRONMENT === 'dev' && Alert.alert('erro', err && err.message ? err.message : err)
		return ''
	}
}

export { registerPushNotification }
