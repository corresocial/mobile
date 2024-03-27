import { encode, neighbors } from 'ngeohash'

function generateGeohashes(latitude: number = 0, longitude: number = 0) {
	const geohash = encode(latitude, longitude, 6)
	const geohashNearby = [geohash.substring(0, 6)].concat(
		neighbors(encode(latitude, longitude, 6)),
	)

	// const geohashCity = [geohash.substring(0, 5)].concat(
	// 	neighbors(encode(latitude, longitude, 5)),
	// )

	return {
		// geohash,
		geohashNearby,
		// geohashCity,
	}
}

export { generateGeohashes }
