import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function getNisFromLocalRepositoryUC(useSmasRepository: () => SmasRepositoryInterface) {
	const { localStorage } = useSmasRepository()
	return localStorage.getNisValue()
}

export { getNisFromLocalRepositoryUC }
