import { MAPS_API } from '@env'
import axios from 'axios'

async function getPlaceLimits(query: string) {
	const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&language=pt-BR&key=${MAPS_API}`)
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
