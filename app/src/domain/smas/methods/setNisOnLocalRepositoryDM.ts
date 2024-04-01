import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function setNisOnLocalRepositoryDM(nis: string, useSmasRepository: () => SmasRepositoryInterface) {
	const { localStorage } = useSmasRepository()
	return localStorage.saveNisValue(nis)
}

export { setNisOnLocalRepositoryDM }
