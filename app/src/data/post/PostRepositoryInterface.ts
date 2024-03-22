import { PostType } from '@domain/entities/posts/types'

import { PostCollection, UserCollection } from '@services/firebase/types'

interface PostRepositoryInterface {
	localStorage: {
		getNumberOfOfflinePosts: () => Promise<number>
		getOfflinePosts: () => Promise<PostCollection[]>

		saveOfflinePost: (post: PostCollection) => Promise<boolean>

		deleteOfflinePostByDescription: (description: string) => Promise<boolean>
		clearOfflinePosts: () => Promise<boolean>
	},

	remoteStorage: {
		createPost: (post: PostCollection, user: UserCollection, postType: PostType) => Promise<string | null>
	}
}

export { PostRepositoryInterface }
