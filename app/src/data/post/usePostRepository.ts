import { clearOfflinePosts, deleteOfflinePostByDescription, getNumberOfOfflinePosts, getOfflinePosts, saveOfflinePost, } from './localStorage/offlinePosts'
import { PostRepositoryInterface } from './PostRepositoryInterface'
import { createPost } from './remoteStorage/createPost'

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
			// POST
			createPost: createPost
		}
	}
}

export { usePostRepository }
