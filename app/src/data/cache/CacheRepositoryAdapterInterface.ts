import { QueryClient } from '@tanstack/react-query'

interface CacheRepositoryAdapterInterface {
	checkCacheImageValidation: () => void

	defaultCachePersistence: number
	executeCachedRequest: (cacheClient: QueryClient, cacheKey: any[], fetchMethod: any, refresh?: boolean) => Promise<any>
}

export { CacheRepositoryAdapterInterface }
