import { Class } from '@domain/shared/interfaces/Class'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterLocalRepository } from '@data/citizenRegister/CitizenRegisterLocalRepository'
import { CitizenRegisterRemoteRepository } from '@data/citizenRegister/CitizenRegisterRemoteRepository'

import { CitizenRegisterEntity, CitizenRegisterEntityOptional } from '../model/entities/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'
import { GoogleMapsService, GoogleMapsServiceInterfaceClass } from '@services/googleMaps/GoogleMapsService'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'
import { CitizenHasAccountOnApp } from '../useCases/CitizenHasAccountOnApp'
import { CreateCitizenRegister } from '../useCases/CreateCitizenRegister'
import { DeleteOfflineCitizenRegister } from '../useCases/DeleteOfflineCitizenRegister'
import { GetCitizenRegistrationsByCoordinatorResponsability } from '../useCases/GetCitizenRecordsOfQuestionnaireAdministrators'
import { GetCitizenRegistrationInProgress } from '../useCases/GetCitizenRegistrationInProgress'
import { GetCitizenRegistrationQuestionary } from '../useCases/GetCitizenRegistrationQuestionary'
import { GetOfflineCitizenRegisters } from '../useCases/GetOfflineCitizenRegisters'
import { RemoveCitizenRegistrationInProgress } from '../useCases/RemoveCitizenRegistrationInProgress'
import { SaveCitizenRegisterOffline } from '../useCases/SaveCitizenRegisterOffline'
import { SaveCitizenRegistrationProgress } from '../useCases/SaveCitizenRegistrationProgress'
import { SendOfflineRegisters } from '../useCases/SendOfflineRegisters'

interface CitizenRegisterUseCasesProps {
	localRepository: Class<CitizenRegisterLocalRepositoryInterface>
	remoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>
	googleMapsService: Class<GoogleMapsServiceInterfaceClass>
}

export class CitizenRegisterUseCases {
	private localRepository: Class<CitizenRegisterLocalRepositoryInterface>
	private remoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>
	private googleMapsService: Class<GoogleMapsServiceInterfaceClass>

	constructor(props?: CitizenRegisterUseCasesProps) {
		this.localRepository = props?.localRepository || CitizenRegisterLocalRepository
		this.remoteRepository = props?.remoteRepository || CitizenRegisterRemoteRepository
		this.googleMapsService = props?.googleMapsService || GoogleMapsService
	}

	getCitizenRegistrationQuestionary() {
		return new GetCitizenRegistrationQuestionary().exec()
	}

	citizenHasAccountOnApp(useCloudFunctionService: () => CloudFunctionServiceInterface, cellNumber: string) {
		return new CitizenHasAccountOnApp(useCloudFunctionService).exec(cellNumber)
	}

	createCitizenRegister(currentUser: UserEntity, citizenRegisterData: CitizenRegisterEntityOptional) {
		return new CreateCitizenRegister(this.remoteRepository, this.googleMapsService, currentUser).exec(citizenRegisterData)
	}

	saveCitizenRegisterOffline(currentUser: UserEntity, citizenRegisterData: CitizenRegisterEntityOptional) {
		return new SaveCitizenRegisterOffline(this.localRepository, currentUser).exec(citizenRegisterData)
	}

	getOfflineCitizenRegisters() {
		return new GetOfflineCitizenRegisters(this.localRepository).exec()
	}

	getCitizenRegistrationsByCoordinatorResponsability(currentUser: UserEntity, maxDocs?: number, lastCitizenRegister?: CitizenRegisterEntity | null) {
		return new GetCitizenRegistrationsByCoordinatorResponsability(this.remoteRepository, currentUser).exec({ maxDocs, lastCitizenRegister })
	}

	sendOfflineRegisters() {
		return new SendOfflineRegisters(this.localRepository, this.remoteRepository).exec()
	}

	deleteOfflineCitizenRegister(citizenRegisterId: string) {
		return new DeleteOfflineCitizenRegister(this.localRepository).exec(citizenRegisterId)
	}

	saveCitizenRegistrationProgress(citizenRegisterData: CitizenRegisterEntityOptional) {
		return new SaveCitizenRegistrationProgress(this.localRepository).exec(citizenRegisterData)
	}

	getCitizenRegistrationInProgress() {
		return new GetCitizenRegistrationInProgress(this.localRepository).exec()
	}

	removeCitizenRegistrationInProgress() {
		return new RemoveCitizenRegistrationInProgress(this.localRepository).exec()
	}
}
