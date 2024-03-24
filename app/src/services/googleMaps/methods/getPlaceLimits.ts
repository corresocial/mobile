import axios from 'axios'

import { PlaceLimits } from '../types/types'

import { getEnvVars } from '@infrastructure/environment'

const { MAPS_API } = getEnvVars()

async function getPlaceLimits(query: string) {
	try {
		const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&region=BR&language=pt&key=${MAPS_API}`)
			.then(({ data }) => {
				return data.results[0].geometry.viewport
			})
			.catch((err) => {
				console.log(err)
				return false
			})

		return res as PlaceLimits
	} catch (error) {
		console.log(error)
		return false
	}
}

export { getPlaceLimits }
