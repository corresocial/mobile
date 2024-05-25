import { approvePostDM } from './methods/approvePostDM'
import { getUnapprovedPostsDM } from './methods/getUnapprovedPostsDM'
import { rejectPostDM } from './methods/rejectPostDM'
import { savePostDM } from './methods/savePostDM'
import { updateOwnerDataOnPostsDM } from './methods/updateOwnerDataOnPostsDM'
import { updatePostDM } from './methods/updatePostDM'
import { PostDomainInterface } from './PostDomainInterface'

function usePostDomain(): PostDomainInterface {
	return {
		getUnapprovedPosts: getUnapprovedPostsDM,

		updateOwnerDataOnPosts: updateOwnerDataOnPostsDM,

		savePost: savePostDM,
		approvePost: approvePostDM,
		rejectPost: rejectPostDM,

		updatePost: updatePostDM
	}
}

export { usePostDomain }
