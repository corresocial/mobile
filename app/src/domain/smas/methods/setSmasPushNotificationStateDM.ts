import { Id } from '@domain/globalTypes'

import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function setSmasPushNotificationStateDM(state: boolean, nis: string, userId: Id, useSmasRepository: () => SmasRepositoryInterface) {
	const { remoteStorage } = useSmasRepository()

	try {
		if (state) {
			await remoteStorage.updateSmasTokenNotification(nis, userId)
		} else {
			await remoteStorage.updateSmasTokenNotification(nis, '') // REFACTOR trocar por método delete quando onis chegar vazio, para remover resquícios do realtime database
		}
	} catch (err) {
		console.log(err)
	}
}

export { setSmasPushNotificationStateDM }
