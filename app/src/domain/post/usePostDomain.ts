import { approvePostDM } from './methods/approvePostDM'
import { getUnapprovedPostsDM } from './methods/getUnapprovedPostsDM'
import { savePostDM } from './methods/savePostDM'
import { saveUnapprovedPostDM } from './methods/saveUnapprovedPostDM'
import { updateOwnerDataOnPostsDM } from './methods/updateOwnerDataOnPostsDM'
import { updatePostDM } from './methods/updatePostDM'
import { PostDomainInterface } from './PostDomainInterface'

function usePostDomain(): PostDomainInterface {
	return {
		getUnapprovedPosts: getUnapprovedPostsDM,

		updateOwnerDataOnPosts: updateOwnerDataOnPostsDM,

		savePost: savePostDM,
		saveUnapprovedPost: saveUnapprovedPostDM,
		approvePost: approvePostDM,

		updatePost: updatePostDM
	}
}

export { usePostDomain }
