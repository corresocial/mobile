import axios from 'axios'
import { encode, neighbors } from 'ngeohash'

import { CitizenRegisterLocation } from '@domain/citizenRegister/model/entities/types'

import { AddressSearchResult, GeocodeAddress, PlaceLimits, } from './types/maps'

import { getEnvVars } from '@infrastructure/environment'

const { MAPS_API } = getEnvVars()

export interface GoogleMapsServiceInterfaceClass {
	getPlaceLimits: (query: string) => Promise<PlaceLimits | boolean>
	searchAddressByText: (query: string, allResults?: boolean) => Promise<AddressSearchResult[]>
	getReverseGeocode: (latitude: number, longitude: number) => Promise<GeocodeAddress>
	generateGeohashes(latitude: number, longitude: number): { geohashNearby: string[] }
}

export class GoogleMapsService implements GoogleMapsServiceInterfaceClass {
	async getPlaceLimits(query: string): Promise<PlaceLimits | boolean> {
		try {
			const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					address: query,
					region: 'BR',
					language: 'pt',
					key: MAPS_API,
				},
			})

			const viewport = response.data.results[0]?.geometry.viewport
			return viewport || false
		} catch (error) {
			console.error('Erro ao obter limites do local:', error)
			return false
		}
	}

	async getReverseGeocode(latitude: number, longitude: number): Promise<GeocodeAddress> {
		try {
			const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					latlng: `${latitude},${longitude}`,
					region: 'BR',
					language: 'pt',
					key: MAPS_API,
				},
			})

			const result = response.data.results[0]
			const addressComponents = result?.address_components || []

			const address: GeocodeAddress = {
				city: '',
				country: '',
				street: '',
				number: '',
				state: '',
				district: '',
				postalCode: ''
			}

			addressComponents.forEach((component: any) => {
				if (component.types.includes('administrative_area_level_2') || component.types.includes('administrative_area_level_4')) {
					address.city = component.long_name || ''
				} else if (component.types.includes('country')) {
					address.country = component.long_name || ''
				} else if (component.types.includes('plus_code') || component.types.includes('route')) {
					address.street = component.long_name || ''
				} else if (component.types.includes('administrative_area_level_1')) {
					address.state = component.long_name || ''
				} else if (component.types.includes('sublocality')) {
					address.district = component.long_name || ''
				} else if (component.types.includes('street_number')) {
					address.number = component.long_name || ''
				} else if (component.types.includes('postal_code')) {
					address.postalCode = component.long_name || ''
				}
			})

			return this.structureLocation(address, latitude, longitude)
		} catch (error) {
			console.error('Erro ao obter geocódigo reverso:', error)
			return {} as GeocodeAddress
		}
	}

	async searchAddressByText(query: string, allResults: boolean = false): Promise<AddressSearchResult[]> {
		try {
			const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
				params: {
					query: query,
					language: 'pt-BR',
					key: MAPS_API,
				},
			})

			if (response.data.results.length === 0) return []

			if (!allResults) {
				const firstResult = response.data.results[0]
				return [{
					lat: firstResult.geometry.location.lat,
					lon: firstResult.geometry.location.lng,
					formattedAddress: firstResult.formatted_address
				}]
			}

			return response.data.results.map((result: any) => ({
				lat: result.geometry.location.lat,
				lon: result.geometry.location.lng,
				formattedAddress: result.formatted_address
			}))
		} catch (error) {
			console.error('Erro ao buscar endereço por texto:', error)
			return []
		}
	}

	private structureLocation(geocodeAddress: GeocodeAddress, latitude: number, longitude: number): CitizenRegisterLocation { // REFACTOR utilizar tipagem centralizada
		return ({
			country: geocodeAddress.country || '',
			state: geocodeAddress.state || '',
			city: geocodeAddress.city || '',
			street: geocodeAddress.street || '',
			district: geocodeAddress.district || '',
			number: geocodeAddress.number || '',
			postalCode: geocodeAddress.postalCode || '',
			geohashNearby: [],
			coordinates: {
				latitude,
				longitude
			}
		})
	}

	generateGeohashes(latitude: number = 0, longitude: number = 0) {
		const geohash = encode(latitude, longitude, 6)
		const geohashNearby = [geohash.substring(0, 6)].concat(
			neighbors(encode(latitude, longitude, 6)),
		)

		return { geohashNearby }
	}
}
