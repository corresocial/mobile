import { savePostDM } from './methods/savePostDM'
import { saveUnapprovedPostDM } from './methods/saveUnapprovedPostDM'
import { updateOwnerDataOnPostsDM } from './methods/updateOwnerDataOnPostsDM'
import { updatePostDM } from './methods/updatePostDM'
import { PostDomainInterface } from './PostDomainInterface'

function usePostDomain(): PostDomainInterface {
	return {
		updateOwnerDataOnPosts: updateOwnerDataOnPostsDM,

		savePost: savePostDM,
		saveUnapprovedPost: saveUnapprovedPostDM,

		updatePost: updatePostDM
	}
}

export { usePostDomain }
