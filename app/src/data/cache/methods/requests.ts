import { QueryClient } from '@tanstack/react-query'

const cacheRequestConfig = { // TODO Integrar ao requestImages
	homeFeed: {
		persistenceTime: 86400000 // Dia
	},
	stripeProducts: {
		persistenceTime: 86400000 * 7
	},
	algoliaPosts: {
		persistenceTime: 86400000
	},
}

async function checkCachedData(cacheClient: QueryClient, cacheKey: any[], fetchMethod: any, refresh?: boolean) {
	if (refresh) console.log('REFRESHED')

	if (!refresh) {
		const cachedData = cacheClient.getQueryData(cacheKey)
		if (cachedData) {
			console.log('CACHED')
			return cachedData
		}
	}

	console.log('FETCHED')
	const data = await fetchMethod()
	cacheClient.setQueryData(cacheKey, data)
	return data
}

export { cacheRequestConfig, checkCachedData }
