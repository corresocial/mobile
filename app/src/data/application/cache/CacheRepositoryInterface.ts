import { QueryClient } from '@tanstack/react-query'

interface CacheRepositoryInterface {
	checkCacheImageValidation: () => void

	defaultCachePersistence: number
	executeCachedRequest: (cacheClient: QueryClient, cacheKey: any[], fetchMethod: any, refresh?: boolean) => Promise<any>
	clearCache: (cacheClient: QueryClient) => void
}

export { CacheRepositoryInterface }
