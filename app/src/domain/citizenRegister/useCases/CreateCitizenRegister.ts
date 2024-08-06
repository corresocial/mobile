import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterEntity, CitizenRegisterEntityOptional } from '../model/entities/types'

import { GoogleMapsServiceInterfaceClass } from '@services/googleMaps/GoogleMapsService'

import { CitizenRegister } from '../model/entities/CitizenRegister'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'

type Input = CitizenRegisterEntityOptional
type Output = Promise<CitizenRegisterEntity>

export class CreateCitizenRegister implements UseCase<Input, Output> {
	private remoteRepository: CitizenRegisterRemoteRepositoryInterface
	private googleMapsService: GoogleMapsServiceInterfaceClass
	private currentUser: UserEntity

	constructor(
		CitizenRegisterRemoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>,
		GoogleMapsService: Class<GoogleMapsServiceInterfaceClass>,
		currentUser: UserEntity
	) {
		this.remoteRepository = new CitizenRegisterRemoteRepository()
		this.googleMapsService = new GoogleMapsService()
		this.currentUser = currentUser // new User(currentUser)
	}

	async exec(citizenRegisterData: Input): Output { // TEST
		let location = citizenRegisterData.location || {}
		if (!citizenRegisterData.location || (citizenRegisterData && citizenRegisterData.location && !(citizenRegisterData.location as any).city)) {
			const coordinates = citizenRegisterData.location && citizenRegisterData.location.coordinates
				? citizenRegisterData.location?.coordinates
				: { latitude: 0, longitude: 0 }

			const geohashObject = this.googleMapsService.generateGeohashes(coordinates.latitude, coordinates.longitude)
			const currentLocation = await this.googleMapsService.getReverseGeocode(coordinates.latitude, coordinates.longitude)

			location = {
				...currentLocation,
				...geohashObject,
				coordinates: {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude
				}
			} as CitizenRegisterEntity['location']
		}

		const coordinatorIdentification = this.currentUser && this.currentUser.verified && this.currentUser.verified.coordinatorId
			? { coordiantorId: this.currentUser.verified.coordinatorId }
			: {}

		const newCitizenRegister = {
			...citizenRegisterData,
			location,
			name: citizenRegisterData.name || 'cidadão',
			...coordinatorIdentification,
			censusTakerId: citizenRegisterData.censusTakerId ? citizenRegisterData.censusTakerId : this.currentUser.userId || '',
			censusTakerName: citizenRegisterData.censusTakerName ? citizenRegisterData.censusTakerName : this.currentUser.name || '',
			createdAt: citizenRegisterData.createdAt || new Date()
		} as CitizenRegisterEntity

		const { data } = new CitizenRegister(newCitizenRegister, true)
		const savedCitizenRegister = await this.remoteRepository.createCitizenRegister(data)
		return savedCitizenRegister
	}
}
