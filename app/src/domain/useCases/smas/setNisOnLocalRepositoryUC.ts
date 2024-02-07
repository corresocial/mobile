import { SmasRepositoryAdapterInterface } from '@data/smas/SmasRepositoryAdapterInterface'

async function setNisOnLocalRepositoryUC(nis: string, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) {
	const { local } = SmasRepositoryAdapter()
	return local.setNisOnStorage(nis)
}

export { setNisOnLocalRepositoryUC }
