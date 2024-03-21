import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function setNisOnLocalRepositoryUC(nis: string, useSmasRepository: () => SmasRepositoryInterface) {
	const { localStorage } = useSmasRepository()
	return localStorage.saveNisValue(nis)
}

export { setNisOnLocalRepositoryUC }
