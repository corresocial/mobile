import * as Location from 'expo-location'

async function askLocationPermissions(): Promise<any> {
	const request = await Location.requestForegroundPermissionsAsync()
	return request.granted
}

export { askLocationPermissions }
