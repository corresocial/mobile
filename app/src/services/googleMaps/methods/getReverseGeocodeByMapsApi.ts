import axios from 'axios'

import { GeocodeAddress } from '../types/maps'

import { getEnvVars } from '@infrastructure/environment'

const { MAPS_API } = getEnvVars()

async function getReverseGeocodeByMapsApi(latitude: number, longitude: number) {
	try {
		const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&region=BR&language=pt&key=${MAPS_API}`)
			.then(({ data }) => {
				const result = data.results[0]
				const addressComponents = result.address_components
				let city = ''
				let country = ''
				let street = ''
				let state = ''
				let district = ''
				let streetNumber = ''
				let postalCode = ''

				addressComponents.forEach((component: any) => {
					if (component.types.includes('administrative_area_level_2') || component.types.includes('administrative_area_level_4')) {
						city = component.long_name || ''
					} else if (component.types.includes('country')) {
						country = component.long_name || ''
					} else if (component.types.includes('plus_code') || component.types.includes('route')) {
						street = component.long_name || ''
					} if (component.types.includes('administrative_area_level_1')) {
						state = component.long_name || ''
					} if (component.types.includes('sublocality')) {
						district = component.long_name || ''
					} if (component.types.includes('street_number')) {
						streetNumber = component.long_name || ''
					} if (component.types.includes('postal_code')) {
						postalCode = component.long_name || ''
					}
				})

				const completeAddress = {
					city,
					country,
					street,
					number: streetNumber,
					state,
					district,
					postalCode
				}

				return completeAddress
			})

		return res
	} catch (error) {
		console.log(error)
		return {} as GeocodeAddress
	}
}

export { getReverseGeocodeByMapsApi }
