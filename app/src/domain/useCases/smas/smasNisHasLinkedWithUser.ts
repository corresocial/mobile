import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function smasNisHasLinkedWithUserUC(nis: string, SmasRepositoryAdapter: () => SmasRepositoryInterface) {
	const { local, remote } = SmasRepositoryAdapter()

	const linkedNis = nis || await local.getNisValue()

	if (!linkedNis) return false

	const smasTokenNotification = await remote.getNotificationTokenByNis(linkedNis)
	return !!smasTokenNotification
}

export { smasNisHasLinkedWithUserUC }
