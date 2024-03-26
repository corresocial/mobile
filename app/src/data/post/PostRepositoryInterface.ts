import { PostType } from '@domain/post/entity/types'

import { PostCollection, UserCollection } from '@services/firebase/types'

import { PostRangeLocation } from './remoteStorage/updateRangeAndLocationOnPosts'

interface PostRepositoryInterface {
	localStorage: {
		getNumberOfOfflinePosts: () => Promise<number>
		getOfflinePosts: () => Promise<PostCollection[]>

		saveOfflinePost: (post: PostCollection) => Promise<boolean>

		deleteOfflinePostByDescription: (description: string) => Promise<boolean>
		clearOfflinePosts: () => Promise<boolean>
	},

	remoteStorage: {
		getPostById: (postId: string) => Promise<PostCollection | null>

		createPost: (post: PostCollection, user: UserCollection, postType: PostType) => Promise<string | null>
		createPostWithCustomId: (postData: PostCollection, ownerPost: PostCollection['owner'], postType: PostType, customId: string) => Promise<string | boolean>

		updatePostData: (postId: string, data: PostCollection) => Promise<boolean>
		markPostAsComplete: (userId: string, postId: string, currentPost: PostCollection, userPosts: PostCollection[]) => Promise<boolean>
		updateOwnerDataOnPosts: (ownerPost: Partial<PostCollection['owner']>, userPostIds: string[]) => Promise<boolean>
		updateRangeAndLocationOnPosts: (
			userOwner: PostCollection['owner'],
			userPosts: PostCollection[],
			newPostRangeLocation: PostRangeLocation,
			subscriptionChange?: boolean
		) => Promise<PostCollection[]>

		deletePost: (postId: string, userId: string) => Promise<boolean>
		deletePostPictures: (postPictures: string[]) => Promise<boolean>
	}
}

export { PostRepositoryInterface }
