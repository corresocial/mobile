import { CacheRepositoryAdapterInterface } from './CacheRepositoryAdapterInterface'
import { cacheImageConfig, checkCacheImageValidation } from './methods/image'

function CacheRepositoryAdapter(): CacheRepositoryAdapterInterface {
	return {
		cacheImageConfig: cacheImageConfig,
		checkCacheImageValidation: checkCacheImageValidation
	}
}

export { CacheRepositoryAdapter }
