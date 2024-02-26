import { Id } from '@domain/entities/globalTypes'

import { SmasRepositoryAdapterInterface } from '@data/smas/SmasRepositoryAdapterInterface'

async function setSmasPushNotificationStateUC(state: boolean, nis: string, userId: Id, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) {
	const { remote } = SmasRepositoryAdapter()

	try {
		if (state) {
			await remote.updateSmasTokenNotification(nis, userId)
		} else {
			await remote.updateSmasTokenNotification(nis, '')
		}
	} catch (err) {
		console.log(err)
	}
}

export { setSmasPushNotificationStateUC }
