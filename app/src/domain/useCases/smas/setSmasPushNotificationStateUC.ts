import { Id } from '@domain/entities/globalTypes'

import { SmasRepositoryAdapterInterface } from '@data/smas/SmasRepositoryAdapterInterface'

async function setSmasPushNotificationStateUC(state: boolean, nis: string, userId: Id, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) {
	const { local, remote } = SmasRepositoryAdapter()

	const linkedNis = nis || await local.getNisFromStorage()

	if (!linkedNis) return

	try {
		await remote.updateSmasTokenNotification(linkedNis, userId)
	} catch (err) {
		console.log(err)
	}
}

export { setSmasPushNotificationStateUC }
