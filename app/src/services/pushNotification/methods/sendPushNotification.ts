import axios from 'axios'

import { NotificationMessageConfig } from '../types'

async function sendPushNotification(notificationMessage: NotificationMessageConfig) {
	const body = JSON.stringify(notificationMessage)
	const requestHeaderConfig = {
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		}
	}

	return axios.post('https://exp.host/--/api/v2/push/send', body, requestHeaderConfig)
		.then((response) => { return response.data.status === 'ok' })
		.catch((error: any) => {
			console.error(error)
			throw new Error(error)
		})
}

export { sendPushNotification }
