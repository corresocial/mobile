import * as Location from 'expo-location'

// O ideal é utilizar getCurrentPositionAsync
// Mas a função está apresentando problemas ainda não solucionados
// https://github.com/expo/expo/issues/10756

async function getCurrentLocation() {
	const currentLocation = await new Promise((resolve, reject) => {
		Location.watchPositionAsync({
			accuracy: Location.Accuracy.Highest,
			timeInterval: 1000,
			distanceInterval: 1,
		}, (position) => {
			resolve(position)
		})
			.catch((error) => {
				reject(error)
			})
	})

	return currentLocation as Location.LocationObject
}

export { getCurrentLocation }
