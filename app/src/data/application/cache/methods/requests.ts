import { QueryClient } from '@tanstack/react-query'

const defaultCachePersistence = 86400000 // 1 dia

async function executeCachedRequest(cacheClient: QueryClient, cacheKey: any[], fetchMethod: any, refresh?: boolean) {
	if (refresh) console.log('REFRESHED')

	if (!refresh) {
		const cachedData = cacheClient.getQueryData(cacheKey)
		if (cachedData) {
			// Alert.alert('CACHED DATA', JSON.stringify(cachedData))
			// Alert.alert('CACHED KEY', JSON.stringify(cacheKey))
			console.log('CACHED')
			return cachedData
		}
	}

	// Alert.alert('FETCHED KEY', JSON.stringify(cacheKey))
	console.log('FETCHED')
	const data = await fetchMethod()
	cacheClient.setQueryData(cacheKey, data)
	return data
}

export { defaultCachePersistence, executeCachedRequest }
