import { SmasRepositoryAdapterInterface } from '@data/user/SmasRepositoryAdapterInterface'

async function getNisFromLocalRepositoryUC(SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) {
	const { local } = SmasRepositoryAdapter()
	return local.getNisFromStorage()
}

export { getNisFromLocalRepositoryUC }
