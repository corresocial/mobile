import { clearOfflinePosts, deleteOfflinePostByDescription, getNumberOfOfflinePosts, getOfflinePosts, saveOfflinePost, } from './localStorage/offlinePosts'
import { PostRepositoryInterface } from './PostRepositoryInterface'

function usePostRepository(): PostRepositoryInterface {
	return {
		localStorage: {
			getNumberOfOfflinePosts: getNumberOfOfflinePosts,
			getOfflinePosts: getOfflinePosts,

			saveOfflinePost: saveOfflinePost,

			deleteOfflinePostByDescription: deleteOfflinePostByDescription,
			clearOfflinePosts: clearOfflinePosts
		},

		remoteStorage: {

		}
	}
}

export { usePostRepository }
