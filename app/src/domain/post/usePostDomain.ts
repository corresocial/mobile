import { savePostDM } from './methods/savePostDM'
import { updatePostDM } from './methods/updatePostDM'
import { PostDomainInterface } from './PostDomainInterface'

function usePostDomain(): PostDomainInterface {
	return {
		updatePost: updatePostDM,
		savePost: savePostDM
	}
}

export { usePostDomain }
