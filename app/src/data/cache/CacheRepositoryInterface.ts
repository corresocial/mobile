import { QueryClient } from '@tanstack/react-query'

interface CacheRepositoryInterface {
	checkCacheImageValidation: () => void

	defaultCachePersistence: number
	executeCachedRequest: (cacheClient: QueryClient, cacheKey: any[], fetchMethod: any, refresh?: boolean) => Promise<any>
}

export { CacheRepositoryInterface }
