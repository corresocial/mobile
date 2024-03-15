interface CacheRepositoryAdapterInterface {
	cacheImageConfig: { clearCacheOnExpire: boolean, persistenceTime: number }
	checkCacheImageValidation: () => void
}

export { CacheRepositoryAdapterInterface }
