import axios from 'axios'

import { AddressSearchResult } from './types'

import { getEnvVars } from '@infrastructure/environment'

const { MAPS_API } = getEnvVars()

async function searchAddressByText(query: string, allResults?: boolean) {
	const res = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&language=pt-BR&key=${MAPS_API}`)
		.then(({ data }) => {
			if (data.results.length === 0) return []
			if (!allResults) {
				return [{
					lat: data.results[0].geometry.location.lat,
					lon: data.results[0].geometry.location.lng,
					formattedAddress: data.results[0].formatted_address
				}] as AddressSearchResult[]
			}
			return data.results.map((result: any) => { // TODO Type
				return {
					lat: result.geometry.location.lat,
					lon: result.geometry.location.lng,
					formattedAddress: result.formatted_address
				}
			}) as AddressSearchResult[]
		})
		.catch((err) => {
			console.log(err)
			return [] as AddressSearchResult[]
		})

	return res
}

export { searchAddressByText }
