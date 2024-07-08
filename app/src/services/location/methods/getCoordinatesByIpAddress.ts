import axios from 'axios'

async function getCoordinatesByIpAddress() {
	const response = await axios.get('https://ipapi.co/json/')

	if (response.data) {
		return {
			latitude: response.data.latitude,
			longitude: response.data.longitude,
		}
	}

	return null
}

export { getCoordinatesByIpAddress }
