import { SmasRepositoryAdapterInterface } from '@data/smas/SmasRepositoryAdapterInterface'

import { PushNotificationServiceInterface } from '@services/pushNotification/PushNotificationServiceInterface'

async function setSmasPushNotificationStateUC(state: boolean, nis: string, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface, PushNotificationService: () => PushNotificationServiceInterface) {
	const { local, remote } = SmasRepositoryAdapter()
	const { addNotificationListener, removeNotificationListener, registerPushNotification } = PushNotificationService()

	const notificationListener = null // useRef()
	const responseListener = null // useRef()

	const linkedNis = nis || await local.getNisFromStorage()
	if (!linkedNis) throw new Error('NIS not found')

	try {
		if (state) {
			const tokenNotification = await registerPushNotification() // Note: Não funcionao no expo em dev
			await remote.updateSmasTokenNotification(linkedNis, tokenNotification)
			addNotificationListener(notificationListener, responseListener)
		} else {
			await remote.updateSmasTokenNotification(linkedNis, '')
			removeNotificationListener(notificationListener, responseListener)
		}
	} catch (err) {
		console.log(err)
	}
}

export { setSmasPushNotificationStateUC }
