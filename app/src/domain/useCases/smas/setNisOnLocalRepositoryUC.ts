import { SmasRepositoryAdapterInterface } from '@data/user/SmasRepositoryAdapterInterface'

async function setNisOnLocalRepositoryUC(nis: string, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) {
	const { local } = SmasRepositoryAdapter()
	return local.setNisOnStorage(nis)
}

export { setNisOnLocalRepositoryUC }
