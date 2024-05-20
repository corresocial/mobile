import { savePostDM } from './methods/savePostDM'
import { updateOwnerDataOnPostsDM } from './methods/updateOwnerDataOnPostsDM'
import { updatePostDM } from './methods/updatePostDM'
import { PostDomainInterface } from './PostDomainInterface'

function usePostDomain(): PostDomainInterface {
	return {
		updateOwnerDataOnPosts: updateOwnerDataOnPostsDM,

		savePost: savePostDM,

		updatePost: updatePostDM
	}
}

export { usePostDomain }
