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

async function checkCachedData(cacheClient: QueryClient, cacheKey: any[], fetchMethod: any) {
	const cachedData = cacheClient.getQueryData(cacheKey)
	if (cachedData) return cachedData

	const data = await fetchMethod()
	cacheClient.setQueryData(cacheKey, data)
	return data
}

export { cacheRequestConfig, checkCachedData }
