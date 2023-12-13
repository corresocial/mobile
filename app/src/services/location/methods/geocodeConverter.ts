import * as Location from 'expo-location'

const convertGeocodeToAddress = async (latitude: number, longitude: number) => {
	const geocodeAddressConverted = await Location.reverseGeocodeAsync({ latitude, longitude })
	return geocodeAddressConverted
}

export { convertGeocodeToAddress }
