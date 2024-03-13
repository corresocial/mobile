import { SmasRepositoryAdapterInterface } from '@data/smas/SmasRepositoryAdapterInterface'

async function getNisFromLocalRepositoryUC(SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) {
	const { local } = SmasRepositoryAdapter()
	return local.getNisFromStorage()
}

export { getNisFromLocalRepositoryUC }
