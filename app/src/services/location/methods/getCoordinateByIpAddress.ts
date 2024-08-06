import axios from 'axios'

async function getCoordinatesByIpAddress() {
	try {
		const response = await axios.get('http://ip-api.com/json/')

		if (response.data) {
			return {
				latitude: response.data.lat,
				longitude: response.data.lon,
			}
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getCoordinatesByIpAddress }
