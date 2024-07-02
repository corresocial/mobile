import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterEntity, CitizenRegisterEntityOptional } from '../model/entities/types'

import { GoogleMapsServiceInterfaceClass } from '@services/googleMaps/GoogleMapsService'
import { useLocationService } from '@services/location/useLocationService'

import { CitizenRegister } from '../model/entities/CitizenRegister'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'

const { getCurrentLocation } = useLocationService() // CURRENT Não deve ficar aqui

type Input = CitizenRegisterEntityOptional
type Output = Promise<CitizenRegisterEntity>

export class CreateCitizenRegister implements UseCase<Input, Output> {
	private remoteRepository: CitizenRegisterRemoteRepositoryInterface
	private googleMapsService: GoogleMapsServiceInterfaceClass
	private currentUser: any

	constructor(
		CitizenRegisterRemoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>,
		GoogleMapsService: Class<GoogleMapsServiceInterfaceClass>,
		currentUser: UserEntity // REFACTOR Type user
	) {
		this.remoteRepository = new CitizenRegisterRemoteRepository()
		this.googleMapsService = new GoogleMapsService()
		this.currentUser = currentUser // new User(currentUser)
	}

	async exec(citizenRegisterData: Input): Output { // TEST
		let location = {}

		if (citizenRegisterData.location && !citizenRegisterData.location.city) {
			const currentCoordinates = await getCurrentLocation()
			const geohashObject = this.googleMapsService.generateGeohashes(currentCoordinates.coords.latitude, currentCoordinates.coords.longitude)
			const currentLocation = await this.googleMapsService.getReverseGeocode(currentCoordinates.coords.latitude, currentCoordinates.coords.longitude)

			location = {
				...currentLocation,
				...geohashObject,
				coordinates: {
					latitude: currentCoordinates.coords.latitude,
					longitude: currentCoordinates.coords.longitude
				}
			} as CitizenRegisterEntity['location']
		}

		const newCitizenRegister = {
			...citizenRegisterData,
			...location,
			name: citizenRegisterData.name || 'cidadão',
			censusTakerId: citizenRegisterData.censusTakerId ? citizenRegisterData.censusTakerId : this.currentUser.userId || '',
			censusTakerName: citizenRegisterData.censusTakerName ? citizenRegisterData.censusTakerName : this.currentUser.name || '',
			createdAt: new Date(),
		} as CitizenRegisterEntity

		const { data } = new CitizenRegister(newCitizenRegister, true)
		const savedCitizenRegister = await this.remoteRepository.createCitizenRegister(data)
		return savedCitizenRegister
	}
}
