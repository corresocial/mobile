import { clearOfflinePosts, deleteOfflinePostByDescription, getNumberOfOfflinePosts, getOfflinePosts, saveOfflinePost, } from './localStorage/offlinePosts'
import { PostRepositoryInterface } from './PostRepositoryInterface'
import { createPost } from './remoteStorage/createPost'
import { createPostWithCustomId } from './remoteStorage/createPostWithCustomId'
import { deletePost } from './remoteStorage/deletePost'
import { deletePostMedias } from './remoteStorage/deletePostMedias'
import { getPostById } from './remoteStorage/getPostById'
import { getPostIdsByUser } from './remoteStorage/getPostIdsByUser'
import { getPostsByMacroCategory } from './remoteStorage/getPostsByMacroCategory'
import { getPostsByUser } from './remoteStorage/getPostsByUser'
import { getUnapprovedPosts } from './remoteStorage/getUnapprovedPosts'
import { markPostAsComplete } from './remoteStorage/markPostAsCompleted'
import { updateOwnerDataOnPosts } from './remoteStorage/updateOwnerDataOnPosts'
import { updatePostData } from './remoteStorage/updatePostData'
import { updatePostsList } from './remoteStorage/updatePosts'
import { uploadPostMedias } from './remoteStorage/uploadPostMedias'

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
			// GET
			getPostById: getPostById,
			getPostsByUser: getPostsByUser,
			getPostIdsByUser: getPostIdsByUser,
			getUnapprovedPosts: getUnapprovedPosts,
			getPostsByMacroCategory: getPostsByMacroCategory,

			// POST
			createPost: createPost,
			createPostWithCustomId: createPostWithCustomId,

			// UPDATE
			updatePostData: updatePostData,
			markPostAsComplete: markPostAsComplete,
			updatePostsList: updatePostsList,
			updateOwnerDataOnPosts: updateOwnerDataOnPosts,

			// DELETE
			deletePost: deletePost,
			deletePostMedias: deletePostMedias,

			// UPLOAD
			uploadPostMedias: uploadPostMedias
		}
	}
}

export { usePostRepository }
