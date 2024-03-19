import { CacheRepositoryAdapterInterface } from './CacheRepositoryAdapterInterface'
import { checkCacheImageValidation } from './methods/images'
import { defaultCachePersistence, executeCachedRequest } from './methods/requests'

function CacheRepositoryAdapter(): CacheRepositoryAdapterInterface {
	return {
		checkCacheImageValidation: checkCacheImageValidation,

		defaultCachePersistence: defaultCachePersistence,
		executeCachedRequest: executeCachedRequest
	}
}

export { CacheRepositoryAdapter }
