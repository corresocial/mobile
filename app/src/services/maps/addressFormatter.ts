import * as Location from 'expo-location'

const structureAddress = (geocodeAddress: Location.LocationGeocodedAddress[]) => ({
	country: geocodeAddress[0].country || '',
	state: geocodeAddress[0].region || '',
	city: geocodeAddress[0].city || geocodeAddress[0].subregion || '',
	postalCode: geocodeAddress[0].postalCode || '',
	street: geocodeAddress[0].street || '',
	number: geocodeAddress[0].streetNumber || geocodeAddress[0].name || '',
	district: geocodeAddress[0].district === geocodeAddress[0].subregion ? 'Centro' : geocodeAddress[0].district || '',
})

export { structureAddress }
