import axios from 'axios'

import { getEnvVars } from '@infrastructure/environment'

const { MAPS_API } = getEnvVars()

async function getPlaceLimits(query: string) {
	const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&region=BR&language=pt&key=${MAPS_API}`)
		.then(({ data }) => {
			return data.results[0].geometry.viewport
		})
		.catch((err) => {
			console.log(err)
			return false
		})

	return res
}

export { getPlaceLimits }
