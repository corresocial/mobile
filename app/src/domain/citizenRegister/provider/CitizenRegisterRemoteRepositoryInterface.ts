import { CitizenRegisterEntity } from '../model/entities/types'

export interface CitizenRegisterRemoteRepositoryInterface {
	createCitizenRegister(data: CitizenRegisterEntity): Promise<CitizenRegisterEntity>
	getCitizenRegistrationsByCoordinator(coordinatorId: string, maxDocs?: number, lastDoc?: CitizenRegisterEntity | null): Promise<CitizenRegisterEntity[]>
}
