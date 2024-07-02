import { CitizenRegisterEntity, CitizenRegisterEntityOptional } from '../model/entities/types'

export interface CitizenRegisterLocalRepositoryInterface {
	updateOfflineCitizenRegisters(citizenRegisters: CitizenRegisterEntity[], overwrite?: boolean): Promise<string | void>
	getOfflineCitizenRegisters(): Promise<CitizenRegisterEntity[]>
	removeCitizenRegister(citizenRegisterId: string): Promise<CitizenRegisterEntity[]>
	updateCitizenRegistrationInProgress(citizenRegister: CitizenRegisterEntityOptional): Promise<void>
	getCitizenRegistrationProgressData(): Promise<CitizenRegisterEntity>
	removeCitizenRegistrationInProgress(): Promise<void>
}
