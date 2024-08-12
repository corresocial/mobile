import * as Location from 'expo-location'

async function hasLocationPermissions() {
	const hasPermission = (await Location.getForegroundPermissionsAsync()).granted
	return hasPermission
}

export { hasLocationPermissions }
