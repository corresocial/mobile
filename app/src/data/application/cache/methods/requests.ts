import { QueryClient } from '@tanstack/react-query'

const defaultCachePersistence = 86400000 // 1 dia

async function executeCachedRequest(cacheClient: QueryClient, cacheKey: any[], fetchMethod: any, refresh?: boolean) {
	if (refresh) console.log('REFRESHED =>', cacheKey[0])

	if (!refresh) {
		const cachedData = cacheClient.getQueryData(cacheKey)
		if (cachedData) {
			console.log('CACHED =>', cacheKey[0])
			return cachedData
		}
	}

	console.log('FETCHED =>', cacheKey[0])
	const data = await fetchMethod()
	cacheClient.setQueryData(cacheKey, data)
	return data
}

export { defaultCachePersistence, executeCachedRequest }
