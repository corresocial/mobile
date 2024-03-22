import { clearOfflinePosts, deleteOfflinePostByDescription, getNumberOfOfflinePosts, getOfflinePosts, saveOfflinePost, } from './localStorage/offlinePosts'
import { PostRepositoryInterface } from './PostRepositoryInterface'
import { createPost } from './remoteStorage/createPost'
import { createPostWithCustomId } from './remoteStorage/createPostWithCustomId'
import { deletePost } from './remoteStorage/deletePost'
import { deletePostPictures } from './remoteStorage/deletePostPictures'
import { getPostById } from './remoteStorage/getPostById'
import { markPostAsComplete } from './remoteStorage/markPostAsCompleted'
import { updateOwnerDataOnPosts } from './remoteStorage/updateOwnerDataOnPosts'
import { updatePostData } from './remoteStorage/updatePost'
import { updateRangeAndLocationOnPosts } from './remoteStorage/updateRangeAndLocationOnPosts'

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

			// POST
			createPost: createPost,
			createPostWithCustomId: createPostWithCustomId,

			// UPDATE
			updatePostData: updatePostData,
			markPostAsComplete: markPostAsComplete,
			updateOwnerDataOnPosts: updateOwnerDataOnPosts,
			updateRangeAndLocationOnPosts: updateRangeAndLocationOnPosts,

			// DELETE
			deletePost: deletePost,
			deletePostPictures: deletePostPictures
		}
	}
}

export { usePostRepository }
