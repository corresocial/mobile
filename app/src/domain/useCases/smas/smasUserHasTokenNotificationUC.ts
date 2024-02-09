import { SmasRepositoryAdapterInterface } from '@data/smas/SmasRepositoryAdapterInterface'

async function smasUserHasTokenNotificationUC(nis: string, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) {
	const { local, remote } = SmasRepositoryAdapter()

	const linkedNis = nis || await local.getNisFromStorage()

	if (!linkedNis) return false

	const smasTokenNotification = await remote.getNotificationTokenByNis(linkedNis)
	return !!smasTokenNotification
}

export { smasUserHasTokenNotificationUC }
