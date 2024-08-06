import { PostType, PostEntityOptional, PostEntity } from '@domain/post/entity/types'
import { UserOwner } from '@domain/user/entity/types'

import { MacroCategoriesType } from '@utils/postMacroCategories/types'

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
		getPostsByUser(userId: string, maxDocs?: number, lastDoc?: PostEntity | null, completed?: boolean, allPosts?: boolean): Promise<PostEntity[]>
		getPostIdsByUser(userId: string): Promise<string[]>
		getUnapprovedPosts(maxDocs?: number, lastDoc?: PostEntity | any): Promise<PostEntity[]>
		getPostsByMacroCategory: (macroCategory: MacroCategoriesType, maxDocs: number, lastDoc: PostEntity | null, allPosts: boolean) => Promise<PostEntity[]>

		createPost: (post: PostEntityOptional) => Promise<PostEntity | null>
		createPostWithCustomId: (postData: PostEntityOptional, ownerPost: UserOwner, postType: PostType, customId: string) => Promise<string | boolean>

		updatePostData: (postId: string, data: PostEntityOptional, merge?: boolean) => Promise<boolean>
		markPostAsComplete: (postId: string, postData: PostEntityOptional, state: boolean) => Promise<boolean>
		updateOwnerDataOnPosts: (ownerPost: Partial<UserOwner>, userPostIds: string[]) => Promise<boolean>
		updatePostsList: (userPosts: PostEntity[]) => Promise<boolean>

		deletePost: (postId: string, userId: string) => Promise<boolean>
		deletePostMedias: (postMedias: string[], storagePath: StorageFolder) => Promise<boolean>

		uploadPostMedias: (mediaUri: string[], folder: StorageFolder) => Promise<string[]>
	}
}

export { PostRepositoryInterface }
