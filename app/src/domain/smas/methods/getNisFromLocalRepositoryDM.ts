import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

async function getNisFromLocalRepositoryDM(useSmasRepository: () => SmasRepositoryInterface) {
	const { localStorage } = useSmasRepository()
	return localStorage.getNisValue()
}

export { getNisFromLocalRepositoryDM }
