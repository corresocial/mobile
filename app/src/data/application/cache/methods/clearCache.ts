import { QueryClient } from '@tanstack/react-query'

function clearCache(cacheClient: QueryClient) {
	cacheClient.clear()
}

export { clearCache }
