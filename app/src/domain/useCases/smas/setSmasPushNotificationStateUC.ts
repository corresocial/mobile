import { Id } from '@domain/entities/globalTypes'

import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function setSmasPushNotificationStateUC(state: boolean, nis: string, userId: Id, SmasRepositoryAdapter: () => SmasRepositoryInterface) {
	const { remote } = SmasRepositoryAdapter()

	try {
		if (state) {
			await remote.updateSmasTokenNotification(nis, userId)
		} else {
			await remote.updateSmasTokenNotification(nis, '') // TODO trocar por método delete quando onis chegar vazio, para remover resquícios do realtime database
		}
	} catch (err) {
		console.log(err)
	}
}

export { setSmasPushNotificationStateUC }
