import { Id } from '@domain/globalTypes'

function getNotificationConfig(tokenNotification: Id, title: string, textMessage: string) {
	return {
		to: tokenNotification,
		sound: 'default',
		title,
		body: textMessage,
		data: { collapseKey: 'corre.notification' }
	}
}

export { getNotificationConfig }
