import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function setNisOnLocalRepositoryUC(nis: string, SmasRepositoryAdapter: () => SmasRepositoryInterface) {
	const { local } = SmasRepositoryAdapter()
	return local.saveNisValue(nis)
}

export { setNisOnLocalRepositoryUC }
