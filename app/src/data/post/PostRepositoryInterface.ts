import { PostType, PostEntityOptional, PostEntity } from '@domain/post/entity/types'

import { PostRangeLocation } from './remoteStorage/updateRangeAndLocationOnPosts'
import { StorageFolder } from './remoteStorage/uploadPostMedias'

interface PostRepositoryInterface {
	localStorage: {
		getNumberOfOfflinePosts: () => Promise<number>
		getOfflinePosts: () => Promise<PostEntityOptional[]>

		saveOfflinePost: (post: PostEntityOptional) => Promise<boolean>

		deleteOfflinePostByDescription: (description: string) => Promise<boolean>
		clearOfflinePosts: () => Promise<boolean>
	},

	remoteStorage: {
		getPostById: (postId: string) => Promise<PostEntityOptional | null>

		createPost: (post: PostEntityOptional) => Promise<PostEntity | null>
		createPostWithCustomId: (postData: PostEntityOptional, ownerPost: PostEntity['owner'], postType: PostType, customId: string) => Promise<string | boolean>

		updatePostData: (postId: string, data: PostEntityOptional) => Promise<boolean>
		markPostAsComplete: (userId: string, postId: string, currentPost: PostEntityOptional, userPosts: PostEntityOptional[]) => Promise<boolean>
		updateOwnerDataOnPosts: (ownerPost: Partial<PostEntityOptional['owner']>, userPostIds: string[]) => Promise<boolean>
		updateRangeAndLocationOnPosts: (
			userOwner: PostEntity['owner'],
			userPosts: PostEntity[],
			newPostRangeLocation: PostRangeLocation,
			subscriptionChange?: boolean
		) => Promise<PostEntity[]>

		deletePost: (postId: string, userId: string) => Promise<boolean>
		deletePostMedias: (postMedias: string[], storagePath: 'pictures') => Promise<boolean>

		uploadPostMedias: (mediaUri: string[], folder: StorageFolder) => Promise<string[]>
	}
}

export { PostRepositoryInterface }
