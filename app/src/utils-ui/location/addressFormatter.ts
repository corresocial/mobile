import * as Location from 'expo-location'
import { PostCollectionCommonFields } from '../../services/firebase/types'
import { GeocodeAddress } from '../../services/maps/types'

const structureAddress = (geocodeAddress: GeocodeAddress, latitude?: number, longitude?: number) => ({
	country: geocodeAddress.country || '',
	state: geocodeAddress.state || '',
	city: geocodeAddress.city || '',
	street: geocodeAddress.street || '',
	district: geocodeAddress.district || '',
	number: geocodeAddress.number || '',
	postalCode: geocodeAddress.postalCode || '',
	coordinates: {
		latitude,
		longitude
	}
})

const structureExpoLocationAddress = (geocodeAddress: Location.LocationGeocodedAddress[], latitude?: number, longitude?: number) => ({
	country: geocodeAddress[0].country || '',
	state: geocodeAddress[0].region || '',
	city: geocodeAddress[0].city || geocodeAddress[0].subregion || '',
	postalCode: geocodeAddress[0].postalCode || '',
	street: geocodeAddress[0].street || '',
	number: geocodeAddress[0].streetNumber || geocodeAddress[0].name || '',
	district: geocodeAddress[0].district === geocodeAddress[0].subregion ? 'Centro' : geocodeAddress[0].district || '',
	coordinates: {
		latitude,
		longitude
	}
})

const getTextualAddress = (address: PostCollectionCommonFields['location']) => {
	return `${address?.street || ''}, ${address?.number || ''}, ${address?.district || ''} - ${address?.city || ''}`
}

export { structureAddress, structureExpoLocationAddress, getTextualAddress }
