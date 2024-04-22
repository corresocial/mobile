import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function smasNisHasLinkedWithUserDM(nis: string, useSmasRepository: () => SmasRepositoryInterface) {
	const { localStorage, remoteStorage } = useSmasRepository()

	const linkedNis = nis || await localStorage.getNisValue()

	if (!linkedNis) return false

	const smasTokenNotification = await remoteStorage.getNotificationTokenByNis(linkedNis)
	return !!smasTokenNotification
}

export { smasNisHasLinkedWithUserDM }
