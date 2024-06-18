import { CitizenRegisterEntity } from '../model/entities/types'

export interface CitizenRegisterRemoteRepositoryInterface {
	createCitizenRegister: (data: CitizenRegisterEntity) => Promise<CitizenRegisterEntity>
}
