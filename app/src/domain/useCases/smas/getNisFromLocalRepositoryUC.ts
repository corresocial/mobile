import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function getNisFromLocalRepositoryUC(SmasRepositoryAdapter: () => SmasRepositoryInterface) {
	const { local } = SmasRepositoryAdapter()
	return local.getNisValue()
}

export { getNisFromLocalRepositoryUC }
