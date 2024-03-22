import { CacheRepositoryInterface } from './CacheRepositoryInterface'
import { checkCacheImageValidation } from './methods/images'
import { defaultCachePersistence, executeCachedRequest } from './methods/requests'

function useCacheRepository(): CacheRepositoryInterface {
	return {
		checkCacheImageValidation: checkCacheImageValidation,

		defaultCachePersistence: defaultCachePersistence,
		executeCachedRequest: executeCachedRequest
	}
}

export { useCacheRepository }
