import { approvePostDM } from './methods/approvePostDM'
import { getEventPosts } from './methods/getEventPosts'
import { getPostsByOwnerDM } from './methods/getPostsByOwnerDM'
import { getUnapprovedPostsDM } from './methods/getUnapprovedPostsDM'
import { rejectPostDM } from './methods/rejectPostDM'
import { savePostDM } from './methods/savePostDM'
import { updateLocationDataOnPostsDM } from './methods/updateLocationDataOnPostsDM'
import { updateOwnerDataOnPostsDM } from './methods/updateOwnerDataOnPostsDM'
import { updatePostDM } from './methods/updatePostDM'
import { updatePostPresenceList } from './methods/updatePostPresenceList'
import { PostDomainInterface } from './PostDomainInterface'

function usePostDomain(): PostDomainInterface {
	return {
		getUnapprovedPosts: getUnapprovedPostsDM,
		getPostsByOwner: getPostsByOwnerDM,

		updateOwnerDataOnPosts: updateOwnerDataOnPostsDM,

		savePost: savePostDM,
		approvePost: approvePostDM,
		rejectPost: rejectPostDM,

		updatePost: updatePostDM,
		updateLocationDataOnPosts: updateLocationDataOnPostsDM,

		getEventPosts: getEventPosts,

		updatePostPresenceList: updatePostPresenceList
	}
}

export { usePostDomain }
