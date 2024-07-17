import { QueryClient } from '@tanstack/react-query'

const defaultCachePersistence = 86400000 // 1 dia

async function executeCachedRequest(cacheClient: QueryClient, cacheKey: any[], fetchMethod: any, refresh?: boolean) {
	if (refresh) console.log('[cache]: refresh -', cacheKey[0], cacheKey[1] || '')

	if (!refresh) {
		const cachedData = cacheClient.getQueryData(cacheKey)
		if (cachedData) {
			console.log('[cache]: cached -', cacheKey[0], cacheKey[1] || '')
			return cachedData
		}
	}

	console.log('[cache]: fetched -', cacheKey[0], cacheKey[1] || '')
	const data = await fetchMethod()
	cacheClient.setQueryData(cacheKey, data)
	return data
}

export { defaultCachePersistence, executeCachedRequest }
