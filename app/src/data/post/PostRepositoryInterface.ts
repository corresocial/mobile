import { PostCollection } from '@services/firebase/types'

interface PostRepositoryInterface {
	localStorage: {
		getNumberOfOfflinePosts: () => Promise<number>
		getOfflinePosts: () => Promise<PostCollection[]>

		saveOfflinePost: (post: PostCollection) => Promise<boolean>

		deleteOfflinePostByDescription: (description: string) => Promise<boolean>
		clearOfflinePosts: () => Promise<boolean>
	},
	remoteStorage: {

	}
}

export { PostRepositoryInterface }
