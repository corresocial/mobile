import { QueryClient } from '@tanstack/react-query'

const defaultCachePersistence = 604800000

async function executeCachedRequest(cacheClient: QueryClient, cacheKey: any[], fetchMethod: any, refresh?: boolean) {
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

export { defaultCachePersistence, executeCachedRequest }
