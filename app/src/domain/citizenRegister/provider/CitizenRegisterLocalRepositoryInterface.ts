import { CitizenRegisterEntity } from '../model/entities/types'

export interface CitizenRegisterLocalRepositoryInterface {
	updateOfflineCitizenRegisters(citizenRegisters: CitizenRegisterEntity[], overwrite?: boolean): Promise<void>
	getOfflineCitizenRegisters(): Promise<CitizenRegisterEntity[]>
	removeCitizenRegister(citizenRegisterId: string): Promise<CitizenRegisterEntity[]>
}
